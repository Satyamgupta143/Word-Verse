import './Components.css' ;
import backendAvatar from './pictures/backend-avatar.jpg' ;
import frontendAvatar from './pictures/frontend-avatar.jpg' ;
import { FaLinkedin, FaEnvelope } from 'react-icons/fa' ;

const About = () => {

    return (
      < div className = "about" >
      < div className = "about-content" >
        < h2 className = "about-heading" > About Us </h2>

        <section className = "about-section" >
          <h3 className = "about-subheading" >Objective</ h3 >
          < p className = "about-description" >
          Our mission is to bring you an exciting real-time word-guessing game! Built with the power of WebSocket and Go, it’s fast, fun, and ready to challenge your vocabulary skills!
          </ p >
        </ section >

        < section className = "about-section" >
          < h3 className = "about-subheading" >Our Team</h3 >
          < div className = "team-member-container" >
                        < div className = "team-member-info" >
                            < img src = { backendAvatar } alt = "Backend Developer Avatar" className = "team-avatar" />
                            <div className="team-text">
                                < span className = "team-member" > Sheetal Lodhi </ span >
                                < br />
                                < span className = "team-role" > Backend Developer </ span >
                                < br />
                                < div className = "contact-button" >
                                    < a href = "https://www.linkedin.com/in/sheetal-lodhi"  >
                                        < FaLinkedin className = "contact-icon" />
                                    </ a >
                                    < a href="mailto:sheetallodhi28@gmail.com" >
                                        < FaEnvelope className = "contact-icon" />
                                    </ a >
                                </ div >
                            </ div >
                        </ div >
                        < div className = "team-member-info">
                            < img src = { frontendAvatar } alt = "Frontend Developer Avatar" className = "team-avatar" />
                            < div className = "team-text" >
                                < span className = "team-member" > Satyam Gupta </ span >
                                < br />
                                < span className = "team-role" > Frontend Developer </ span >
                                < br />
                                < div className = "contact-button" >
                                    < a href = "https://www.linkedin.com/in/"  >
                                        < FaLinkedin className = "contact-icon" />
                                    </ a >
                                    < a href = "mailto:satyamgupta98933@gmail.com" >
                                        < FaEnvelope className = "contact-icon" />
                                    </ a >
                                </ div >
                            </ div >
                        </ div >
                    </ div > 
        </ section >
        
      </ div >
    </ div >
    ) ;
  } ;
export default About ;
