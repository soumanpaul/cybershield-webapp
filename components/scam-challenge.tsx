"use client";

import Image from "next/image";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  Clock3,
  Copy,
  Instagram,
  LockKeyhole,
  Menu,
  MessageCircle,
  PhoneOff,
  Share2,
  Shield,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Video,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Screen = "landing" | "choose" | "intro" | "question" | "correct" | "wrong" | "gameover" | "progress" | "share";

const challenges = [
  { name: "Digital Arrest", image: "/assets/scam-challenge/digital-arrest-banner.png", tone: "from-blue-500 to-blue-700", badge: "Hot", featured: true },
  { name: "UPI Collect Request", image: "/assets/scam-challenge/card-upi.png", tone: "from-emerald-200 to-emerald-50", badge: undefined, featured: false },
  { name: "QR Code Scam", image: "/assets/scam-challenge/card-qr.png", tone: "from-blue-100 to-indigo-100", badge: undefined, featured: false },
  { name: "OTP Scam", image: "/assets/scam-challenge/card-otp.png", tone: "from-amber-100 to-orange-100", badge: undefined, featured: false },
  { name: "Fake Investment", image: "/assets/scam-challenge/card-investment.png", tone: "from-fuchsia-100 to-pink-100", badge: undefined, featured: false },
  { name: "Fake Job", image: "/assets/scam-challenge/card-job.png", tone: "from-violet-100 to-purple-100", badge: undefined, featured: false },
  { name: "Courier / Customs Scam", image: "/assets/scam-challenge/card-courier.png", tone: "from-yellow-100 to-amber-100", badge: undefined, featured: false },
  { name: "Sextortion", image: "/assets/scam-challenge/card-sextortion.png", tone: "from-pink-100 to-fuchsia-100", badge: undefined, featured: false },
] as const;

const questions = [
  {
    kind: "message",
    sender: "+91 98765 43210",
    eyebrow: "SBI Security Team",
    message: "Dear Customer,\n\nYour SBI account will be blocked today.\n\nUpdate KYC immediately:\nsecure-bank-update.xyz",
    prompt: "What do you do?",
    options: ["Open the link", "Call the number", "Ignore and verify through the official app"],
    correct: 2,
    flags: ["Creates urgency", "Suspicious link", "Fake authority language", "Requests account verification"],
  },
  {
    kind: "call",
    sender: "Cyber Crime Department",
    eyebrow: "Incoming WhatsApp Video Call",
    message: "Sir, your Aadhaar is linked to money laundering. Do not disconnect this call.",
    prompt: "What do you do?",
    options: ["Transfer the money", "Ask for more proof", "Disconnect and call 1930"],
    correct: 2,
    flags: ["Authority pressure", "Threatens arrest", "Demands secrecy", "Uses an unofficial video call"],
  },
  {
    kind: "message",
    sender: "Police Verification Desk",
    eyebrow: "Urgent Evidence Request",
    message: "Your name is in a criminal case. Share your Aadhaar, bank statement and OTP now to clear your record.",
    prompt: "Choose the safest response.",
    options: ["Send the documents", "Share only the OTP", "Refuse and verify at the nearest police station"],
    correct: 2,
    flags: ["Asks for OTP", "Requests sensitive documents", "No case reference", "Creates fear"],
  },
  {
    kind: "message",
    sender: "Investigation Officer",
    eyebrow: "Confidential Instructions",
    message: "Stay on video call. Move your savings to a safe account. You must not tell your family or bank.",
    prompt: "What is the red flag?",
    options: ["The officer is being helpful", "Police never ask for a secret money transfer", "A video call proves identity"],
    correct: 1,
    flags: ["Safe-account lie", "Secrecy demand", "Money transfer", "Impersonation"],
  },
  {
    kind: "message",
    sender: "Cyber Crime Court",
    eyebrow: "Final Notice",
    message: "Pay ₹25,000 in 10 minutes or a digital arrest warrant will be issued against you.",
    prompt: "How should you respond?",
    options: ["Pay before time runs out", "Negotiate a smaller payment", "End contact, save evidence and report the scam"],
    correct: 2,
    flags: ["Digital arrest is fake", "Countdown pressure", "Payment demand", "Unofficial contact"],
  },
] as const;

export function ScamChallenge() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [challenge, setChallenge] = useState("Digital Arrest");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showMore, setShowMore] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shared, setShared] = useState(false);
  const [challengerScore, setChallengerScore] = useState<number | null>(null);
  const [isFriendChallenge, setIsFriendChallenge] = useState(false);
  const answerLocked = useRef(false);

  const question = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;
  const safeScore = Math.min(1000, Math.max(0, score));

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const sharedScore = Number(search.get("challengerScore"));
    const sharedChallenge = search.get("challenge");

    if (Number.isFinite(sharedScore) && sharedScore >= 0 && sharedScore <= 1000 && search.has("challengerScore")) {
      setChallengerScore(sharedScore);
      setIsFriendChallenge(true);
    }
    if (sharedChallenge && challenges.some(({ name }) => name === sharedChallenge)) {
      setChallenge(sharedChallenge);
    }
  }, []);

  useEffect(() => {
    if (screen !== "question") return;
    answerLocked.current = false;
    setTimeLeft(15);
    const timer = window.setInterval(() => setTimeLeft((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [screen, questionIndex]);

  useEffect(() => {
    if (screen !== "question" || timeLeft !== 0) return;
    if (answerLocked.current) return;
    answerLocked.current = true;
    playGameSound("wrong");
    const nextMistakes = mistakes + 1;
    setScore((current) => current - 50);
    setMistakes(nextMistakes);
    setShowExplanation(false);
    setScreen(nextMistakes >= 3 ? "gameover" : "wrong");
  }, [mistakes, screen, timeLeft]);

  function resetGame(nextScreen: Screen = "landing") {
    setQuestionIndex(0);
    setScore(0);
    setMistakes(0);
    setTimeLeft(15);
    setShowExplanation(false);
    answerLocked.current = false;
    setScreen(nextScreen);
  }

  function chooseChallenge(name: string) {
    setChallenge(name);
    setScreen("intro");
  }

  function answer(index: number) {
    if (answerLocked.current) return;
    answerLocked.current = true;

    if (index === question.correct) {
      playGameSound("correct");
      setScore((current) => Math.min(1000, current + 200));
      setScreen("correct");
      return;
    }
    playGameSound("wrong");
    const nextMistakes = mistakes + 1;
    setScore((current) => current - 50);
    setMistakes(nextMistakes);
    setShowExplanation(false);
    setScreen(nextMistakes >= 3 ? "gameover" : "wrong");
  }

  function nextQuestion() {
    if (questionIndex === questions.length - 1) {
      setScreen("progress");
      return;
    }
    setQuestionIndex((current) => current + 1);
    setScreen("question");
  }

  function retryQuestion() {
    answerLocked.current = false;
    setTimeLeft(15);
    setShowExplanation(false);
    setScreen("question");
  }

  async function shareChallenge(preferWhatsApp = false) {
    const challengeUrl = new URL("/scam-challenge", window.location.origin);
    challengeUrl.searchParams.set("challengerScore", String(safeScore));
    challengeUrl.searchParams.set("challenge", challenge);
    const shareData = {
      title: "CyberRakshak Friend Challenge",
      text: `I scored ${safeScore}/1000 on CyberRakshak. Can you beat me?\n\n${challengeUrl.toString()}`,
    };

    if (preferWhatsApp) {
      // Keep this navigation synchronous with the tap. Mobile browsers may block
      // WhatsApp when it is opened after awaiting image generation.
      setShared(true);
      window.location.assign(`https://wa.me/?text=${encodeURIComponent(shareData.text)}`);
      return;
    }

    try {
      const scoreImage = await createScoreShareImage(safeScore);
      const files = [scoreImage];

      if (navigator.share && (!navigator.canShare || navigator.canShare({ files }))) {
        await navigator.share({ ...shareData, files });
      } else {
        downloadScoreImage(scoreImage);
        await navigator.clipboard.writeText(shareData.text);
      }
      setShared(true);
    } catch {
      // Closing the native share sheet is not an application error.
    }
  }

  return (
    <main className="min-h-[100svh] bg-[#eaf6ff] text-[#071b4a] sm:px-4 sm:py-5">
      <div className={`mx-auto flex min-h-[100svh] w-full max-w-[430px] flex-col overflow-hidden bg-white shadow-[0_18px_70px_rgba(16,58,104,.18)] sm:min-h-[calc(100svh-40px)] sm:rounded-[34px] ${screen === "correct" ? "bg-[#092759]" : ""} ${screen === "wrong" || screen === "gameover" ? "bg-[#160b0e]" : ""}`}>
        {screen !== "correct" && screen !== "wrong" && screen !== "gameover" && <ChallengeHeader onHome={() => resetGame("landing")} />}

        {screen === "landing" && <Landing challengerScore={challengerScore} onStart={() => setScreen(isFriendChallenge ? "intro" : "choose")} />}
        {screen === "choose" && <ChooseChallenge showMore={showMore} setShowMore={setShowMore} onChoose={chooseChallenge} />}
        {screen === "intro" && <ScenarioIntro challenge={challenge} onBack={() => setScreen("choose")} onStart={() => setScreen("question")} />}
        {screen === "question" && <QuestionScreen question={question} index={questionIndex} progress={progress} timeLeft={timeLeft} onBack={() => questionIndex ? setQuestionIndex((current) => current - 1) : setScreen("intro")} onAnswer={answer} />}
        {screen === "correct" && <CorrectResult score={safeScore} flags={question.flags} onNext={nextQuestion} />}
        {screen === "wrong" && <WrongResult question={question} showExplanation={showExplanation} onTryAgain={retryQuestion} onExplanation={() => setShowExplanation((current) => !current)} />}
        {screen === "gameover" && <GameOver onTryAgain={() => resetGame("intro")} onHome={() => resetGame("landing")} />}
        {screen === "progress" && <LevelProgress score={safeScore} onContinue={() => setScreen("share")} />}
        {screen === "share" && <ShareInvite score={safeScore} challengerScore={challengerScore} shared={shared} onShare={() => shareChallenge(false)} onWhatsApp={() => shareChallenge(true)} onPlay={() => resetGame("choose")} />}
      </div>
    </main>
  );
}

function ChallengeHeader({ onHome }: { onHome: () => void }) {
  return (
    <header className="flex h-[78px] shrink-0 items-center justify-between border-b border-blue-50 px-5">
      <button type="button" onClick={onHome} className="flex items-center gap-3 text-left" aria-label="Go to challenge home">
        <BrandMark />
        <span><strong className="block text-[16px] font-black leading-none text-[#0a2f72]">Cyber Suraksha</strong><small className="mt-1 block text-[8px] text-slate-500">Be Aware. Be Safe. Be Secure.</small></span>
      </button>
      <button type="button" className="rounded-lg p-2 text-[#0a2f72]" aria-label="Challenge menu"><Menu className="size-5" /></button>
    </header>
  );
}

function BrandMark({ dark = false }: { dark?: boolean }) {
  return <span className={`relative grid size-10 place-items-center ${dark ? "text-cyan-300" : "text-blue-700"}`}><Shield className="absolute size-10 fill-current/10" strokeWidth={2} /><Star className="size-4 fill-current" /></span>;
}

function Landing({ challengerScore, onStart }: { challengerScore: number | null; onStart: () => void }) {
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden px-6 pb-6 pt-8">
      <div className="relative z-10">
        {challengerScore !== null && <div className="mb-5 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-[12px] shadow-sm"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-amber-100"><Trophy className="size-6 fill-amber-400 text-amber-500" /></span><span><strong className="block text-[13px] text-[#071b4a]">A friend challenged you!</strong>Beat their score of <b>{challengerScore}/1000</b>.</span></div>}
        <h1 className="!text-[30px] !font-black !leading-[1.05] !tracking-[-1px] !text-[#071b4a]">Can a scammer<br />fool you?</h1>
        <p className="mt-3 text-[16px] font-semibold text-[#173d79]">Take the challenge!</p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[{ icon: CircleUserRound, label: "No Login" }, { icon: LockKeyhole, label: "No App Install" }, { icon: ShieldCheck, label: "Just Play" }].map(({ icon: Icon, label }) => <div key={label} className="text-center"><span className="mx-auto grid size-10 place-items-center rounded-full border-2 border-blue-100 text-blue-800"><Icon className="size-5" /></span><strong className="mt-2 block text-[10px]">{label}</strong></div>)}
        </div>
      </div>

      <div className="relative mt-4 min-h-[330px] flex-1">
        <Image src="/assets/scam-challenge/landing-characters.png" alt="Indian family learning cyber safety together" fill priority className="object-contain object-bottom" sizes="430px" />
        <div className="absolute bottom-24 right-0 rotate-[-4deg] rounded-full border-4 border-white bg-white px-3 py-3 text-center text-[15px] font-black leading-4 text-green-600 shadow-xl">PLAY<br />LEARN<br /><span className="text-[#113b7b]">STAY SAFE</span></div>
      </div>

      <button type="button" onClick={onStart} className="relative z-10 flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-[15px] font-bold text-white shadow-lg shadow-blue-600/25">{challengerScore !== null ? "Accept Challenge" : "Start Challenge"} <ArrowRight className="ml-4 size-5" /></button>
      <p className="relative z-10 mt-5 text-center text-[11px] font-medium leading-4 text-[#315485]">A safer digital India<br />with informed citizens</p>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-blue-100/80 to-transparent" />
      <div className="absolute bottom-0 right-0 h-2 w-36 rounded-t-full bg-gradient-to-r from-orange-500 via-white to-green-600" />
    </section>
  );
}

function ChooseChallenge({ showMore, setShowMore, onChoose }: { showMore: boolean; setShowMore: (value: boolean) => void; onChoose: (name: string) => void }) {
  const visible = showMore ? challenges : challenges.slice(0, 6);
  return (
    <section className="flex-1 px-5 pb-6 pt-7">
      <h1 className="!text-[26px] !font-black !leading-tight !tracking-[-.6px] !text-[#071b4a]">Choose a Challenge</h1>
      <p className="mt-1 text-center text-[12px] leading-5 text-slate-600">Test your skills with real-world<br />scam scenarios.</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {visible.map(({ name, image, tone, badge, featured }) => <button type="button" key={name} onClick={() => onChoose(name)} className={`relative min-h-[112px] overflow-hidden rounded-xl bg-gradient-to-br ${tone} text-[#071b4a] shadow-sm transition active:scale-[.98]`}>
          {featured ? <Image src={image} alt="Police officer in a Digital Arrest scam scenario" fill className="object-cover object-[68%_center]" sizes="169px" /> : <span className="relative mx-auto mt-1 block h-[76px] w-[92px]"><Image src={image} alt={`${name} challenge illustration`} fill className="object-contain drop-shadow-md" sizes="92px" /></span>}
          <span className={`absolute inset-x-0 bottom-0 px-2 py-2.5 text-center text-[11px] font-black leading-4 ${featured ? "bg-gradient-to-t from-[#061b49] via-[#061b49]/85 to-transparent pt-8 text-white" : "text-[#071b4a]"}`}>{name}</span>
          {badge && <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold text-white">{badge}</span>}
        </button>)}
      </div>
      <button type="button" onClick={() => setShowMore(!showMore)} className="mx-auto mt-5 flex h-11 items-center gap-2 rounded-lg bg-blue-50 px-6 text-[12px] font-bold text-blue-700">{showMore ? "Show Fewer" : "View More Scenarios"}<ChevronDown className={`size-4 transition ${showMore ? "rotate-180" : ""}`} /></button>
    </section>
  );
}

function ScenarioIntro({ challenge, onBack, onStart }: { challenge: string; onBack: () => void; onStart: () => void }) {
  return (
    <section className="flex flex-1 flex-col px-5 pb-6 pt-4">
      <div className="flex items-center justify-between"><button type="button" onClick={onBack} className="rounded-lg p-2" aria-label="Back to challenges"><ArrowLeft className="size-5" /></button><span className="text-[11px] font-semibold text-slate-400">1/5</span><Target className="size-4 text-slate-500" /></div>
      <div className="mt-2 overflow-hidden rounded-[24px] bg-[#071e4b] shadow-lg">
        <div className="relative aspect-[16/9]"><Image src="/assets/scam-challenge/digital-arrest-banner.png" alt="Digital arrest scam scenario" fill priority className="object-cover" sizes="390px" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-12 text-center text-xl font-black tracking-wide text-white">{challenge.toUpperCase()}</div></div>
      </div>
      <p className="mt-4 text-[13px] leading-5 text-slate-700">Scammers pretend to be police or CBI officers and threaten you with arrest to make you transfer money.</p>
      <div className="mt-4 rounded-xl bg-blue-50 p-4"><strong className="text-[13px] text-blue-800">✦ Your Mission:</strong><p className="mt-1 pl-5 text-[12px] leading-5 text-slate-700">Make the right choices and stay safe!</p></div>
      <div className="mt-5 space-y-3">
        {[{ icon: Target, text: "5 Realistic Situations", tone: "text-blue-600 bg-blue-50" }, { icon: Trophy, text: "Earn Points", tone: "text-amber-500 bg-amber-50" }, { icon: BadgeCheck, text: "Unlock Badges", tone: "text-blue-700 bg-blue-50" }].map(({ icon: Icon, text, tone }) => <div key={text} className="flex items-center gap-3 text-[12px] font-semibold"><span className={`grid size-8 place-items-center rounded-full ${tone}`}><Icon className="size-4" /></span>{text}</div>)}
      </div>
      <button type="button" onClick={onStart} className="mt-auto flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-[15px] font-bold text-white shadow-lg shadow-blue-600/25">Start Now <ArrowRight className="ml-5 size-5" /></button>
    </section>
  );
}

function QuestionScreen({ question, index, progress, timeLeft, onBack, onAnswer }: { question: typeof questions[number]; index: number; progress: number; timeLeft: number; onBack: () => void; onAnswer: (index: number) => void }) {
  return (
    <section className="flex flex-1 flex-col px-4 pb-5 pt-3">
      <div className="flex items-center gap-3"><button type="button" onClick={onBack} aria-label="Previous screen"><ArrowLeft className="size-5" /></button><div className="flex-1"><div className="mb-1 flex justify-between text-[11px] text-slate-400"><span>Question {index + 1}/5</span><span className={`flex items-center gap-1 font-bold ${timeLeft <= 5 ? "text-red-600" : "text-slate-500"}`}><Clock3 className="size-4" />00:{String(timeLeft).padStart(2, "0")}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-green-500 transition-all" style={{ width: `${progress}%` }} /></div></div></div>

      {question.kind === "call" ? <FakeCallCard question={question} /> : <WhatsAppCard question={question} />}

      <h2 className="mt-6 text-[20px] font-black text-[#071b4a]">{question.prompt}</h2>
      <div className="mt-4 space-y-3">
        {question.options.map((option, optionIndex) => <button type="button" key={option} onClick={() => onAnswer(optionIndex)} className={`flex min-h-14 w-full items-center rounded-xl border px-3 text-left text-[12px] font-semibold shadow-sm transition active:scale-[.99] ${optionIndex === 0 ? "border-red-100 bg-red-50" : optionIndex === 1 ? "border-amber-100 bg-amber-50" : "border-green-100 bg-green-50"}`}><span className={`mr-3 grid size-8 shrink-0 place-items-center rounded-full text-sm font-black text-white ${optionIndex === 0 ? "bg-red-500" : optionIndex === 1 ? "bg-amber-500" : "bg-green-600"}`}>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}
      </div>
    </section>
  );
}

function WhatsAppCard({ question }: { question: typeof questions[number] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl bg-[#ecf1f1] shadow-sm">
      <div className="flex h-12 items-center gap-2 bg-[#13945a] px-3 text-white"><ArrowLeft className="size-4" /><span className="grid size-8 place-items-center rounded-full bg-white/90 text-slate-400"><CircleUserRound className="size-6" /></span><span><strong className="block text-[12px]">{question.sender}</strong><small className="block text-[8px]">online</small></span><Menu className="ml-auto size-4" /></div>
      <div className="min-h-[235px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.9),transparent_38%)] p-5">
        <div className="max-w-[88%] rounded-xl bg-white p-4 text-[13px] leading-6 text-slate-700 shadow-sm whitespace-pre-line">{question.message.split("secure-bank-update.xyz").map((part, index) => <span key={part}>{part}{index === 0 && question.message.includes("secure-bank-update.xyz") && <span className="font-semibold text-blue-600 underline">secure-bank-update.xyz</span>}</span>)}</div>
        <p className="mt-2 text-right text-[8px] text-slate-400">✓✓ 9:35 AM</p>
      </div>
    </div>
  );
}

function FakeCallCard({ question }: { question: typeof questions[number] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl bg-[#082849] text-white shadow-lg">
      <p className="pt-4 text-center text-[11px]">{question.eyebrow}</p>
      <div className="relative mx-4 mt-3 aspect-[4/3] overflow-hidden rounded-xl"><Image src="/assets/scam-challenge/fake-police-caller.png" alt="Caller impersonating a police officer" fill priority className="object-cover" sizes="390px" /></div>
      <div className="p-4 text-center"><strong className="text-[15px]">{question.sender}</strong><p className="mt-3 text-[13px] font-semibold leading-5">“{question.message}”</p><div className="mt-4 flex justify-center gap-16"><span className="grid size-12 place-items-center rounded-full bg-red-500"><PhoneOff className="size-5" /></span><span className="grid size-12 place-items-center rounded-full bg-green-500"><Video className="size-5" /></span></div></div>
    </div>
  );
}

function CorrectResult({ score, flags, onNext }: { score: number; flags: readonly string[]; onNext: () => void }) {
  useEffect(() => {
    const fanfare = window.setTimeout(() => playGameSound("win"), 180);
    return () => window.clearTimeout(fanfare);
  }, []);

  const celebrationStars = [
    { left: "8%", top: "9%", delay: "0ms", size: 18 },
    { left: "21%", top: "20%", delay: "120ms", size: 13 },
    { left: "76%", top: "12%", delay: "70ms", size: 16 },
    { left: "88%", top: "25%", delay: "190ms", size: 12 },
    { left: "13%", top: "36%", delay: "250ms", size: 11 },
    { left: "82%", top: "40%", delay: "310ms", size: 14 },
  ];

  return (
    <section className="relative flex min-h-[100svh] flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_15%,#1551a5,#071b48_48%,#03112f)] px-5 pb-6 pt-12 text-white sm:min-h-[calc(100svh-40px)]">
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        {celebrationStars.map((star, index) => <Star key={index} className="celebration-star absolute fill-amber-300 text-amber-300" style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay }} />)}
      </div>
      <div className="absolute inset-x-0 top-16 text-center text-5xl text-amber-300 opacity-80">✦　✧　✦</div>
      <div className="trophy-pop relative mx-auto grid size-28 place-items-center rounded-full bg-amber-400/20 shadow-[0_0_50px_rgba(251,191,36,.45)]"><Trophy className="size-20 fill-amber-400 text-amber-500" /></div>
      <h1 className="mt-6 text-center !text-[34px] !font-black !leading-[1.05] !tracking-[-1px] !text-white">YOU ESCAPED<br />THE SCAM!</h1>
      <span className="points-drop mx-auto mt-4 rounded-lg bg-green-200 px-5 py-2 text-[18px] font-black text-green-800 shadow-[0_8px_24px_rgba(34,197,94,.35)]">+200 points</span>
      <div className="mt-6 rounded-2xl bg-white p-4 text-[#071b4a] shadow-xl"><h2 className="text-[15px] font-black">You spotted:</h2><ul className="mt-3 space-y-3">{flags.map((flag) => <li key={flag} className="flex items-center gap-3 text-[12px]"><CheckCircle2 className="size-5 fill-green-500 text-white" />{flag}</li>)}</ul><div className="mt-5 flex items-center justify-between text-[12px] font-bold"><span>Cyber Reflex Score</span><span>{Math.min(100, 70 + Math.round(score / 50))}/100</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full w-[82%] rounded-full bg-green-500" /></div></div>
      <div className="mt-5 flex items-center gap-4 rounded-xl border border-cyan-400/20 bg-cyan-300/10 p-4"><span className="grid size-14 place-items-center rounded-2xl border border-cyan-300 bg-cyan-400/20"><ShieldCheck className="size-8 text-cyan-200" /></span><p className="text-[12px]"><strong className="block text-[15px]">You are a<br />Scam Spotter</strong>Level 1</p></div>
      <button type="button" onClick={onNext} className="mt-auto flex h-14 items-center justify-center rounded-xl border border-cyan-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-[15px] font-bold shadow-[0_0_24px_rgba(34,211,238,.45)]">Next Scenario <ArrowRight className="ml-5 size-5" /></button>
      <style jsx>{`
        .trophy-pop { animation: trophy-pop 650ms cubic-bezier(.2, 1.65, .45, 1) both; }
        .points-drop { animation: points-drop 900ms cubic-bezier(.18, 1.55, .35, 1) 180ms both; }
        .celebration-star { animation: star-burst 1100ms cubic-bezier(.2, .8, .3, 1) both; }
        @keyframes trophy-pop {
          0% { opacity: 0; transform: scale(.2) rotate(-18deg); }
          65% { opacity: 1; transform: scale(1.16) rotate(7deg); }
          100% { transform: scale(1) rotate(0); }
        }
        @keyframes points-drop {
          0% { opacity: 0; transform: translateY(-70px) scale(.55) rotate(-8deg); }
          55% { opacity: 1; transform: translateY(12px) scale(1.18) rotate(3deg); }
          75% { transform: translateY(-8px) scale(.96) rotate(-1deg); }
          100% { transform: translateY(0) scale(1) rotate(0); }
        }
        @keyframes star-burst {
          0% { opacity: 0; transform: translateY(26px) scale(.1) rotate(0deg); }
          35% { opacity: 1; transform: translateY(-18px) scale(1.35) rotate(120deg); }
          70% { opacity: 1; transform: translateY(4px) scale(.9) rotate(240deg); }
          100% { opacity: 0; transform: translateY(-10px) scale(.3) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trophy-pop, .points-drop, .celebration-star { animation: none; }
        }
      `}</style>
    </section>
  );
}

function WrongResult({ question, showExplanation, onTryAgain, onExplanation }: { question: typeof questions[number]; showExplanation: boolean; onTryAgain: () => void; onExplanation: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] flex-1 flex-col overflow-hidden bg-[#170b0e] px-5 pb-6 pt-12 text-white sm:min-h-[calc(100svh-40px)]">
      <Image src="/assets/scam-challenge/scammer-shadow.png" alt="Shadowy scammer" fill priority className="object-cover opacity-40" sizes="430px" />
      <div className="relative z-10 mx-auto grid size-24 place-items-center rounded-full border border-red-500/50 bg-red-950/55 shadow-[0_0_30px_rgba(239,68,68,.25)]"><X className="size-12 text-red-500" strokeWidth={3} /></div>
      <h1 className="relative z-10 mt-6 text-center !text-[30px] !font-black !leading-tight !tracking-[-.6px] !text-red-500">SCAMMER ALMOST<br />GOT YOU!</h1>
      <p className="relative z-10 mt-3 text-center text-[13px]">This was a risky choice.</p>
      <div className="relative z-10 mt-8"><h2 className="text-[14px] font-black">What went wrong?</h2><ul className="mt-4 space-y-4">{question.flags.map((flag) => <li key={flag} className="flex items-start gap-3 text-[12px] leading-5 text-red-50/90"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-red-500 text-red-400">!</span>{flag}</li>)}</ul></div>
      {showExplanation && <div className="relative z-10 mt-5 rounded-xl border border-red-500/30 bg-red-950/70 p-4 text-[12px] leading-5 text-red-50">The safe choice was: <strong>{question.options[question.correct]}</strong>. Verify every threat or request using an official app, website, branch, or helpline.</div>}
      <p className="relative z-10 mt-6 text-center text-[24px] font-black text-red-500">−50 points</p>
      <div className="relative z-10 mt-auto space-y-3">
        <div className="rounded-2xl border border-red-400/30 bg-red-950/65 p-3 text-center shadow-[0_0_28px_rgba(239,68,68,.16)]">
          <p className="mb-2 text-[12px] font-semibold text-red-100">Try again?</p>
          <button
            type="button"
            onClick={onTryAgain}
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-[15px] font-black shadow-lg shadow-red-950/40 transition hover:brightness-110 active:scale-[.98]"
          >
            <Target className="size-5 transition-transform group-hover:rotate-12" />
            Beat the scammer
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <button type="button" onClick={onExplanation} className="h-13 w-full rounded-xl border border-red-400 text-[14px] font-bold">{showExplanation ? "Hide Explanation" : "See Explanation"}</button>
      </div>
    </section>
  );
}

function GameOver({ onTryAgain, onHome }: { onTryAgain: () => void; onHome: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] flex-1 flex-col overflow-hidden bg-[#13090c] px-5 pb-7 pt-16 text-white sm:min-h-[calc(100svh-40px)]">
      <Image src="/assets/scam-challenge/scammer-shadow.png" alt="Scammer silhouette" fill priority className="object-cover opacity-45" sizes="430px" />
      <div className="relative z-10 mx-auto grid size-24 place-items-center rounded-full border border-red-700/50 bg-black/35"><Shield className="size-14 text-red-500" /><X className="absolute size-7 text-red-200" /></div>
      <h1 className="relative z-10 mt-7 text-center !text-[30px] !font-black !leading-tight !text-red-500">SCAMMER WON</h1>
      <p className="relative z-10 mt-4 text-center text-[18px] font-bold">You lost ₹10,000<br />in the simulation.</p>
      <div className="relative z-10 mt-10"><h2 className="text-[14px] font-black">What fooled you?</h2><ul className="mt-4 space-y-4 text-[13px]">{["Authority pressure", "Fear", "Urgency", "Fake police identity"].map((item) => <li key={item} className="flex items-center gap-3"><AlertTriangle className="size-5 text-red-500" />{item}</li>)}</ul></div>
      <p className="relative z-10 mt-10 text-center text-[14px] leading-5">But now you know better<br />for real life!</p>
      <div className="relative z-10 mt-auto space-y-3">
        <div className="rounded-2xl border border-red-400/30 bg-red-950/65 p-3 text-center shadow-[0_0_28px_rgba(239,68,68,.16)]">
          <p className="mb-2 text-[12px] font-semibold text-red-100">Try again?</p>
          <button
            type="button"
            onClick={onTryAgain}
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-[15px] font-black shadow-lg shadow-red-950/40 transition hover:brightness-110 active:scale-[.98]"
          >
            <Target className="size-5 transition-transform group-hover:rotate-12" />
            Beat the scammer
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <button type="button" onClick={onHome} className="h-13 w-full rounded-xl border border-red-400 text-[14px] font-bold">Back to Home</button>
      </div>
    </section>
  );
}

function LevelProgress({ score, onContinue }: { score: number; onContinue: () => void }) {
  const levels = [{ n: 1, name: "Phishing Rookie" }, { n: 2, name: "UPI Defender" }, { n: 3, name: "Scam Hunter" }, { n: 4, name: "Cyber Guardian" }, { n: 5, name: "Digital Arrest Survivor" }];
  return (
    <section className="flex flex-1 flex-col px-5 pb-6 pt-7">
      <h1 className="text-center !text-[26px] !font-black !text-[#071b4a]">Level Progress</h1>
      <div className="relative mt-8 flex items-start justify-between before:absolute before:left-8 before:right-8 before:top-5 before:h-1 before:bg-blue-100">{levels.map(({ n, name }, index) => <div key={name} className="relative z-10 w-16 text-center"><span className={`mx-auto grid size-10 place-items-center [clip-path:polygon(50%_0,92%_22%,92%_76%,50%_100%,8%_76%,8%_22%)] text-sm font-black ${index < 3 ? "bg-green-600 text-white" : "bg-slate-200 text-slate-500"}`}>{index === 4 ? <LockKeyhole className="size-4" /> : n}</span><small className="mt-2 block text-[8px] font-bold leading-3">{name}</small></div>)}</div>
      <div className="mt-8 rounded-2xl bg-blue-50 p-5"><div className="flex items-center gap-4"><span className="grid size-20 place-items-center rounded-2xl border-2 border-amber-400 bg-[#07336f] text-amber-400"><Shield className="absolute size-14" /><Target className="size-8" /></span><div><small className="text-[11px] text-slate-500">Current Level</small><strong className="mt-1 block text-[20px]">Scam Hunter</strong><span className="text-[12px]">Level 3</span></div></div><div className="mt-5 flex justify-between text-[10px] text-slate-500"><span>Progress</span><span>{Math.max(320, score)} / 500 points</span></div><div className="mt-2 h-2 rounded-full bg-blue-100"><span className="block h-full w-[63%] rounded-full bg-green-500" /></div></div>
      <div className="mt-5 divide-y divide-blue-50 rounded-xl border border-blue-50">{[{ icon: BadgeCheck, label: "Scenarios Completed", value: "8 / 13" }, { icon: Trophy, label: "Current Streak", value: "🔥 4 scams defeated" }, { icon: Star, label: "Global/College Rank", value: "#17 out of 238" }].map(({ icon: Icon, label, value }) => <div key={label} className="flex min-h-14 items-center gap-3 px-4 text-[11px]"><Icon className="size-5 text-blue-600" /><span>{label}</span><strong className="ml-auto">{value}</strong></div>)}</div>
      <button type="button" onClick={onContinue} className="mt-auto flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-[15px] font-bold text-white">Continue Playing <ArrowRight className="ml-5 size-5" /></button>
    </section>
  );
}

function ShareInvite({ score, challengerScore, shared, onShare, onWhatsApp, onPlay }: { score: number; challengerScore: number | null; shared: boolean; onShare: () => void; onWhatsApp: () => void; onPlay: () => void }) {
  return (
    <section className="flex flex-1 flex-col px-5 pb-6 pt-8">
      <h1 className="!text-[26px] !font-black !leading-tight !text-[#071b4a]">Challenge Your Friends!</h1>
      <p className="mt-2 text-[14px] font-semibold text-slate-600">Think your friend will get fooled?</p>
      {challengerScore !== null && <div className={`mt-4 rounded-xl px-4 py-3 text-center text-[12px] font-bold ${score > challengerScore ? "bg-green-50 text-green-700" : score === challengerScore ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>{score > challengerScore ? `You beat your friend by ${score - challengerScore} points!` : score === challengerScore ? "It’s a tie—challenge them again!" : `You were ${challengerScore - score} points away. Try again!`}</div>}
      <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5"><div className="flex items-center gap-5"><span className="grid size-20 place-items-center rounded-full bg-amber-50"><Trophy className="size-14 fill-amber-400 text-amber-500" /></span><div><small className="text-[11px] text-slate-500">I scored</small><strong className="block text-[24px] text-red-500">{score}/1000</strong><p className="mt-1 text-[11px] font-semibold leading-4">on CyberRakshak<br />Can you beat me? 😎</p></div></div><button type="button" onClick={onShare} className="mt-6 flex h-13 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-[14px] font-bold text-white"><Share2 className="mr-2 size-5" />{shared ? "Challenge Link Ready" : "Challenge a Friend"}</button><div className="mt-5 flex justify-center gap-4"><button type="button" onClick={onWhatsApp} aria-label="Challenge a friend via WhatsApp" className="grid size-11 place-items-center rounded-full bg-green-500 text-white shadow-md shadow-green-500/20"><MessageCircle /></button><span className="grid size-11 place-items-center rounded-full bg-pink-500 text-white"><Instagram /></span><span className="grid size-11 place-items-center rounded-full bg-black text-white"><X /></span><button type="button" onClick={onShare} aria-label="Copy friend challenge link and save score image" className="grid size-11 place-items-center rounded-full bg-slate-100 text-slate-500"><Copy /></button></div><p className="mt-3 text-center text-[10px] text-slate-500">The link carries your score so your friend can try to beat it.</p></div>
      <p className="mt-auto text-center text-[12px] font-semibold leading-5 text-[#204a82]">Together we can build<br />a safer digital India.</p>
      <button type="button" onClick={onPlay} className="mt-6 flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-[14px] font-bold text-white">Play Next Challenge <ArrowRight className="ml-4 size-5" /></button>
    </section>
  );
}

async function createScoreShareImage(score: number): Promise<File> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");

  const background = context.createLinearGradient(0, 0, 1080, 1350);
  background.addColorStop(0, "#071a49");
  background.addColorStop(0.55, "#0b3f93");
  background.addColorStop(1, "#0873d8");
  context.fillStyle = background;
  context.fillRect(0, 0, 1080, 1350);

  context.fillStyle = "rgba(255,255,255,.08)";
  context.beginPath();
  context.arc(540, 390, 330, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(95,220,255,.35)";
  context.lineWidth = 4;
  context.stroke();

  context.fillStyle = "#ffc83d";
  context.beginPath();
  context.roundRect(390, 220, 300, 230, 44);
  context.fill();
  context.fillRect(505, 445, 70, 90);
  context.beginPath();
  context.roundRect(420, 520, 240, 48, 24);
  context.fill();
  context.strokeStyle = "#ffc83d";
  context.lineWidth = 32;
  context.beginPath();
  context.arc(365, 315, 95, Math.PI * .55, Math.PI * 1.45);
  context.stroke();
  context.beginPath();
  context.arc(715, 315, 95, Math.PI * 1.55, Math.PI * .45);
  context.stroke();

  context.textAlign = "center";
  context.fillStyle = "#ffffff";
  context.font = "900 64px Arial, sans-serif";
  context.fillText("CYBER SURAKSHA", 540, 700);
  context.font = "700 42px Arial, sans-serif";
  context.fillStyle = "#bfeaff";
  context.fillText("SCAM CHALLENGE", 540, 765);

  context.fillStyle = "#ffffff";
  context.beginPath();
  context.roundRect(110, 835, 860, 300, 42);
  context.fill();
  context.fillStyle = "#17366f";
  context.font = "700 38px Arial, sans-serif";
  context.fillText("I ESCAPED THE SCAM!", 540, 925);
  context.fillStyle = "#ef3340";
  context.font = "900 94px Arial, sans-serif";
  context.fillText(`${score}/1000`, 540, 1040);
  context.fillStyle = "#38557f";
  context.font = "600 32px Arial, sans-serif";
  context.fillText("Can you beat my score?", 540, 1105);

  context.fillStyle = "#ffffff";
  context.font = "700 31px Arial, sans-serif";
  context.fillText("PLAY • LEARN • STAY SAFE", 540, 1245);

  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Unable to create score image")), "image/png"));
  return new File([blob], `cyber-suraksha-score-${score}.png`, { type: "image/png" });
}

function downloadScoreImage(file: File) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

type GameSound = "correct" | "wrong" | "win";

let gameAudioContext: AudioContext | null = null;

function playGameSound(sound: GameSound) {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    gameAudioContext ??= new AudioContextClass();
    const context = gameAudioContext;
    if (context.state === "suspended") void context.resume();

    const start = context.currentTime + 0.01;
    const notes = sound === "correct"
      ? [{ frequency: 660, at: 0, length: .1 }, { frequency: 880, at: .09, length: .18 }]
      : sound === "win"
        ? [{ frequency: 523, at: 0, length: .13 }, { frequency: 659, at: .11, length: .13 }, { frequency: 784, at: .22, length: .14 }, { frequency: 1047, at: .34, length: .32 }]
        : [{ frequency: 392, at: 0, length: .12 }, { frequency: 311, at: .1, length: .13 }, { frequency: 247, at: .21, length: .15 }, { frequency: 165, at: .34, length: .25 }];

    notes.forEach(({ frequency, at, length }, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = sound === "wrong" ? (index % 2 ? "square" : "triangle") : "sine";
      oscillator.frequency.setValueAtTime(frequency, start + at);
      if (sound === "wrong") oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * .72), start + at + length);
      gain.gain.setValueAtTime(0.0001, start + at);
      gain.gain.exponentialRampToValueAtTime(sound === "wrong" ? .14 : .18, start + at + .018);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + at + length);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start + at);
      oscillator.stop(start + at + length + .02);
    });
  } catch {
    // Audio is an enhancement; gameplay continues when a browser blocks sound.
  }
}
