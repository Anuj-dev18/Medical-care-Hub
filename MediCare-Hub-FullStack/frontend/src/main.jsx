import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const doctors = [
  {name:'Dr. Ananya Sharma', specialty:'Cardiology', exp:'12 years', fee:'₹700', icon:'❤️'},
  {name:'Dr. Rahul Verma', specialty:'Neurology', exp:'9 years', fee:'₹650', icon:'🧠'},
  {name:'Dr. Meera Kapoor', specialty:'Dermatology', exp:'8 years', fee:'₹600', icon:'🩺'},
  {name:'Dr. Arjun Singh', specialty:'General Medicine', exp:'11 years', fee:'₹500', icon:'➕'}
];

const tips = [
  ['💧','Stay Hydrated','Keep water intake regular throughout the day.'],
  ['😴','Sleep Well','A consistent sleep schedule supports overall wellbeing.'],
  ['🥗','Balanced Meals','Include vegetables, fruits, protein and whole grains.'],
  ['🚶','Keep Moving','Regular age-appropriate physical activity supports health.']
];

function App(){
  const [query,setQuery]=useState('');
  const [specialty,setSpecialty]=useState('All');
  const [message,setMessage]=useState('');
  const [symptom,setSymptom]=useState('');
  const [result,setResult]=useState('');

  const filtered=useMemo(()=>doctors.filter(d=>
    (specialty==='All'||d.specialty===specialty) &&
    (d.name.toLowerCase().includes(query.toLowerCase())||d.specialty.toLowerCase().includes(query.toLowerCase()))
  ),[query,specialty]);

  async function book(e){
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.target));
    try{
      const r=await fetch('http://localhost:5000/api/appointments',{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)
      });
      if(!r.ok) throw new Error();
      setMessage('Appointment request saved successfully.');
      e.target.reset();
    }catch{
      setMessage('Backend is not running. Start the Express server to save appointments.');
    }
  }

  function checkSymptoms(){
    if(!symptom.trim()) return setResult('Please enter a symptom for the demo checker.');
    setResult('This demo cannot diagnose illness. Please discuss persistent or serious symptoms with a qualified healthcare professional.');
  }

  return <div>
    <header className="nav">
      <div className="brand"><span>✚</span> MediCare <b>Hub</b></div>
      <nav><a href="#home">Home</a><a href="#doctors">Doctors</a><a href="#appointment">Appointment</a><a href="#tips">Health Tips</a></nav>
      <a className="navbtn" href="#appointment">Book Now</a>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="heroText">
          <div className="pill">● Trusted healthcare demo platform</div>
          <h1>Your health.<br/><span>Our priority.</span></h1>
          <p>Find doctors, request appointments and explore simple health information in one clean dashboard.</p>
          <div className="heroActions"><a href="#doctors" className="primary">Find a Doctor →</a><a href="#appointment" className="secondary">Book Appointment</a></div>
          <div className="stats"><div><b>24/7</b><small>Online access</small></div><div><b>4+</b><small>Specialties</small></div><div><b>100%</b><small>Demo ready</small></div></div>
        </div>
        <div className="heroCard">
          <div className="cross">✚</div>
          <h3>Care at your fingertips</h3>
          <p>Appointments, doctors and health information.</p>
          <div className="mini"><span>✓</span> Easy appointment requests</div>
          <div className="mini"><span>✓</span> Doctor search & filters</div>
          <div className="mini"><span>✓</span> MongoDB-ready backend</div>
        </div>
      </section>

      <section id="doctors" className="section">
        <div className="sectionHead"><div><p className="eyebrow">OUR SPECIALISTS</p><h2>Find the right doctor</h2></div>
          <div className="filters"><input placeholder="Search doctor..." value={query} onChange={e=>setQuery(e.target.value)}/>
          <select value={specialty} onChange={e=>setSpecialty(e.target.value)}><option>All</option><option>Cardiology</option><option>Neurology</option><option>Dermatology</option><option>General Medicine</option></select></div>
        </div>
        <div className="doctorGrid">{filtered.map(d=><article className="doctor" key={d.name}><div className="doctorIcon">{d.icon}</div><h3>{d.name}</h3><p className="specialty">{d.specialty}</p><p>{d.exp} experience · {d.fee}</p><a href="#appointment" onClick={()=>setMessage('')}>Request appointment →</a></article>)}</div>
      </section>

      <section className="checker">
        <div><p className="eyebrow">HEALTH CHECKER DEMO</p><h2>Have a symptom in mind?</h2><p>Try the demo below. It provides general guidance only and is not a medical diagnosis.</p></div>
        <div className="checkerBox"><input value={symptom} onChange={e=>setSymptom(e.target.value)} placeholder="e.g. headache, cough..."/><button onClick={checkSymptoms}>Check</button>{result&&<p className="result">{result}</p>}</div>
      </section>

      <section id="appointment" className="section appointment">
        <div className="appointmentInfo"><p className="eyebrow">APPOINTMENTS</p><h2>Request a consultation</h2><p>Submit your preferred details. The Express API stores the request in MongoDB when configured.</p><div className="contactCard">📞 <span><b>Need urgent help?</b><br/>Contact your local emergency service.</span></div></div>
        <form onSubmit={book} className="form">
          <input name="name" required placeholder="Full name"/>
          <input name="email" type="email" required placeholder="Email address"/>
          <select name="doctor" required><option value="">Choose doctor</option>{doctors.map(d=><option key={d.name}>{d.name}</option>)}</select>
          <input name="date" type="date" required/>
          <textarea name="note" placeholder="Short note (optional)"></textarea>
          <button className="primary" type="submit">Send Request</button>
          {message&&<div className="message">{message}</div>}
        </form>
      </section>

      <section id="tips" className="section">
        <div className="sectionHead"><div><p className="eyebrow">WELLNESS</p><h2>Simple health tips</h2></div></div>
        <div className="tips">{tips.map(t=><div className="tip" key={t[1]}><span>{t[0]}</span><div><h3>{t[1]}</h3><p>{t[2]}</p></div></div>)}</div>
      </section>
    </main>
    <footer><div className="brand"><span>✚</span> MediCare <b>Hub</b></div><p>Educational portfolio project. Not a substitute for professional medical advice.</p></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
