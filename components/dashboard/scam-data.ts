import {
  BarChart3, BriefcaseBusiness, Fish, HandCoins, Heart, MapPin, Phone, QrCode,
  ShieldAlert, Smartphone, UserRound, UsersRound, WalletCards, type LucideIcon,
} from "lucide-react";

export type ScamTone = "blue" | "green" | "violet" | "orange" | "pink";

export interface ScamDetail {
  name: string;
  icon: LucideIcon;
  tone: ScamTone;
  summary: string;
  example: string;
  flow: readonly [string, string, string];
  warningSigns: readonly string[];
  safetySteps: readonly string[];
}

export const SCAM_CATEGORIES: ScamDetail[] = [
  {
    name: "Digital Arrest", icon: ShieldAlert, tone: "blue",
    summary: "A caller pretends to be police or another authority and says you are involved in a crime.",
    example: "You receive a video call saying a parcel or bank account linked to you was used illegally. The caller demands secrecy and money to avoid arrest.",
    flow: ["Fake officer contacts you", "Fear and secrecy are created", "Money is demanded for release"],
    warningSigns: ["Threats of immediate arrest", "Orders to stay on a video call", "Payment to a ‘safe account’"],
    safetySteps: ["End the call", "Verify through an official number", "Never transfer money to avoid arrest"],
  },
  {
    name: "UPI Collect Request", icon: WalletCards, tone: "green",
    summary: "A collect request makes you approve a payment while the scammer claims you are receiving money.",
    example: "A buyer says they are sending you money, but your UPI app shows a collect request asking for your PIN.",
    flow: ["Scammer promises a payment", "A collect request appears", "Your PIN authorizes money going out"],
    warningSigns: ["PIN requested to receive money", "Unexpected collect request", "Pressure to approve quickly"],
    safetySteps: ["Decline unknown requests", "Check whether it says PAY or RECEIVE", "Remember: receiving money needs no UPI PIN"],
  },
  {
    name: "QR Code Scam", icon: QrCode, tone: "violet",
    summary: "A QR code is used to make you pay, open a harmful website, or install something unsafe.",
    example: "Someone says scanning their QR code will send a refund, but it opens a payment screen from your account.",
    flow: ["A refund or reward is promised", "You are asked to scan a QR code", "Payment or a harmful page opens"],
    warningSigns: ["Scan to receive money", "QR code from an unknown person", "Unexpected payment screen"],
    safetySteps: ["Do not scan unknown codes", "Read the payment screen carefully", "Close the app if the purpose changes"],
  },
  {
    name: "OTP Scam", icon: Phone, tone: "orange",
    summary: "A scammer tricks you into sharing a one-time password that can approve a login or transaction.",
    example: "A caller claiming to be from your bank asks for the OTP just sent to your phone to ‘verify’ your account.",
    flow: ["Scammer triggers an OTP", "They ask you to read it aloud", "Your account or payment is taken over"],
    warningSigns: ["Anyone asking for an OTP", "Fake bank or support call", "Urgent account-block warning"],
    safetySteps: ["Never share an OTP", "Read the full OTP message", "Call your bank using its official number"],
  },
  {
    name: "Fake Investment", icon: BarChart3, tone: "pink",
    summary: "Fraudsters promise unusually high or guaranteed returns and show fake profits to gain trust.",
    example: "A social-media group shows daily profits and lets you withdraw a small amount before asking for a much larger investment.",
    flow: ["Guaranteed returns are advertised", "Small fake profits build trust", "Large deposits become impossible to withdraw"],
    warningSigns: ["Guaranteed high returns", "Pressure to invest today", "Extra fee to withdraw profits"],
    safetySteps: ["Verify registration with regulators", "Avoid tips from unknown groups", "Never borrow money to invest"],
  },
  {
    name: "Fake Job", icon: BriefcaseBusiness, tone: "violet",
    summary: "A fake employer offers easy work or a high salary, then asks for fees or personal documents.",
    example: "You receive a job offer without an interview and are asked to pay a registration, training, or equipment fee.",
    flow: ["Attractive job arrives unexpectedly", "A quick selection is announced", "A joining or task fee is demanded"],
    warningSigns: ["Job without a real interview", "Payment before joining", "Recruiter uses a personal email or chat"],
    safetySteps: ["Check the company careers page", "Contact the company directly", "Never pay to get a job"],
  },
  {
    name: "Courier / Customs Scam", icon: MapPin, tone: "pink",
    summary: "A caller says an illegal parcel is linked to you and pretends to transfer you to police or customs.",
    example: "A courier caller says your parcel contains banned items and asks you to pay a fine or join a police video call.",
    flow: ["Fake courier reports a parcel", "Call moves to fake authorities", "Fine or verification money is demanded"],
    warningSigns: ["Parcel you did not send", "Call transferred to ‘police’", "Fine paid to a personal account"],
    safetySteps: ["Hang up and contact the courier directly", "Track parcels only on official sites", "Do not share Aadhaar or bank details"],
  },
  {
    name: "Sextortion", icon: Heart, tone: "pink",
    summary: "Someone uses intimate images, fake recordings, or threats of exposure to demand money.",
    example: "An online contact quickly becomes intimate, records the interaction, and threatens to send it to your contacts unless you pay.",
    flow: ["Trust is built online", "Image or video is captured", "Threats and repeated payment demands begin"],
    warningSigns: ["Fast pressure for private content", "Threats to contact family or friends", "Repeated demands after payment"],
    safetySteps: ["Do not pay or negotiate", "Save evidence and block the account", "Report it and ask a trusted person for help"],
  },
  {
    name: "Social Media Impersonation", icon: UsersRound, tone: "blue",
    summary: "A copied or hacked profile pretends to be someone you know and asks for money or information.",
    example: "A familiar profile messages that they have an emergency and need an immediate transfer to a new account.",
    flow: ["A trusted profile is copied", "An urgent personal story is sent", "Money or a code is requested"],
    warningSigns: ["New account or changed number", "Unusual writing style", "Request for secrecy or urgency"],
    safetySteps: ["Call the person another way", "Check profile history", "Report the fake account"],
  },
  {
    name: "Loan App Scam", icon: HandCoins, tone: "violet",
    summary: "An unsafe loan app offers instant credit, takes excessive phone permissions, and later uses harassment.",
    example: "After a small loan, the app demands much more money and threatens to message edited photos to your contacts.",
    flow: ["Instant loan is offered", "Contacts and photos are accessed", "Harassment and inflated repayment follow"],
    warningSigns: ["App installed outside an official store", "Access to contacts and gallery", "Unclear lender or fees"],
    safetySteps: ["Check the regulated lender", "Deny unnecessary permissions", "Document threats and report harassment"],
  },
  {
    name: "Matrimonial Scam", icon: UserRound, tone: "pink",
    summary: "A fake romantic or matrimonial profile builds emotional trust before inventing a financial emergency.",
    example: "After weeks of messages, the person claims a gift is stuck at customs and asks you to pay a release charge.",
    flow: ["A convincing profile approaches", "Emotional trust develops", "An emergency or customs fee appears"],
    warningSigns: ["Avoids meeting or live verification", "Stories change over time", "Requests money for an emergency"],
    safetySteps: ["Verify identity independently", "Tell family or a trusted friend", "Never send money to an online-only contact"],
  },
  {
    name: "SIM / KYC Scam", icon: Smartphone, tone: "blue",
    summary: "A fake telecom or bank representative claims your SIM or KYC will expire and asks you to install an app or share details.",
    example: "A message says your SIM will stop working today unless you install a support app and complete KYC immediately.",
    flow: ["Service-block warning arrives", "Remote-access app or details are requested", "Phone and accounts are controlled"],
    warningSigns: ["Immediate SIM deactivation threat", "Remote-access app request", "KYC through a personal number"],
    safetySteps: ["Visit the official app or branch", "Never install remote-access software", "Contact the provider directly"],
  },
  {
    name: "Phishing", icon: Fish, tone: "violet",
    summary: "A fake message or website copies a trusted organization to steal passwords, card details, or personal information.",
    example: "An email says your account is locked and links to a page that looks like your bank but uses a slightly different address.",
    flow: ["A convincing alert is sent", "A look-alike website opens", "Details entered there go to the scammer"],
    warningSigns: ["Misspelled or unusual web address", "Unexpected login link", "Urgent threat or reward"],
    safetySteps: ["Open the official app yourself", "Check the full website address", "Change passwords if details were entered"],
  },
];
