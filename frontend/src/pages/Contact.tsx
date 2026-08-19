import { FormEvent, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return <main className="contact-page"><section className="contact-card"><div className="contact-copy"><span>GET IN TOUCH</span><h1>Let's make food redistribution easier.</h1><p>For NGO partnerships, donor support or delivery coordination, send us a message.</p><div className="contact-info"><b>FoodBridge AI</b><small>Chennai, Tamil Nadu</small><small>support@foodbridge.ai</small></div></div><form onSubmit={submit} className="contact-form"><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Message<textarea required rows={6} placeholder="How can we help?" /></label><button>Send message</button>{sent && <div className="contact-success">Message captured successfully. We will get back to you soon.</div>}</form></section></main>;
}
