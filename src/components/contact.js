import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './dashboard.css';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ywc18fm', 'template_pd6tc3a', form.current, 'NrkvqUA_0V_n2DuO0')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form id='formemail' ref={form} onSubmit={sendEmail}>
      <label className='emaillabel'>Name:</label><br/>
      <input className='contactinput' type="text" name="from_name" /><br/>
      <label className='emaillabel'>Email:</label><br/>
      <input className='contactinput' type="email" name="from_email" /><br/>
      <label className='emaillabel'>Message:</label><br/>
      <textarea className='contactinputbody' name="message" /><br/>
      <input id='emailsentbtn' type="submit" value="Send" />
    </form>
  );
};