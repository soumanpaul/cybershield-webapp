import { LockKeyhole, Phone, Search, ShieldCheck } from "lucide-react";

export function DashboardFooter() {
  return (
    <footer className="safety-footer">
      <span><ShieldCheck /><b>Think before you click</b><small>Don’t open unknown links.</small></span>
      <span><Search /><b>Verify before you trust</b><small>Use official channels.</small></span>
      <span><LockKeyhole /><b>Protect your information</b><small>Never share OTP, PIN or CVV.</small></span>
      <span className="footer-call"><Phone /><b>Financial cyber fraud?</b><strong>Call 1930</strong></span>
    </footer>
  );
}
