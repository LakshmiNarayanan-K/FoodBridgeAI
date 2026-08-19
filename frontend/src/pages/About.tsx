import "./About.css";

const pillars = [
  ["Reduce waste", "Rescue safe surplus food before it becomes waste."],
  ["Connect people", "Match donors, NGOs and delivery partners in one workflow."],
  ["Track every handoff", "Use QR-powered live tracking from acceptance to delivery."],
];

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <span className="about-kicker">FOODBRIDGE AI</span>
        <h1>Turning surplus food into verified community impact.</h1>
        <p>FoodBridge connects people who have safe extra food with NGO partners and delivery volunteers who can move it quickly to communities that need it.</p>
      </section>
      <section className="about-grid">
        {pillars.map(([title, copy], index) => <article className="about-card" key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>)}
      </section>
      <section className="about-story"><div><span>HOW IT WORKS</span><h2>A simple chain with a visible status at every step.</h2></div><div className="about-steps"><b>01 Donation created</b><b>02 NGO accepts</b><b>03 QR activated</b><b>04 Delivery tracked</b><b>05 Food delivered</b></div></section>
    </main>
  );
}
