import React from 'react';
import '../assets/css/lockpicking-class.css'; 

const LockpickingClass = () => {
  return (
    <>
      <nav className="minimal-nav">
        <a href="/homepage">Home</a>
        <a href="/profile">Profile</a>
        <a href="/signout">Sign Out</a>
      </nav>

      <div className="content-wrapper">
        <header>
          <h1>Learn the Basics of Lockpicking</h1>
          <p>
            <em>Master the art of lockpicking for legal uses and personal knowledge.</em>
          </p>
        </header>

        <section className="content">
          <p>
            In this tutorial, we'll cover the basics of lockpicking and introduce you to the tools and techniques
            needed to understand simple locks. Note: Always use these skills responsibly and legally.
          </p>

          <h2>What You'll Need</h2>
          <ul>
            <li>Lockpick set (tension wrench and pick)</li>
            <li>Practice lock (transparent locks are ideal for beginners)</li>
          </ul>

          <div className="step">
            <h3>Step 1: Understand the Basics of Locks</h3>
            <p>
              Locks have a series of pins that must be aligned to unlock. When the correct key is inserted, all pins
              align, allowing the lock to turn. Here's an example:
            </p>
            <div className="image-container">
              <img src="/assets/images/correctkey.png" alt="Correct Key Aligns Pins" />
              <div className="image-credit">Credit: Author Name</div>
            </div>
            <p>
              If an incorrect key is used, the pins won't align, and the lock will stay closed:
            </p>
            <div className="image-container">
              <img src="/assets/images/incorrectkey.png" alt="Incorrect Key Does Not Align Pins" />
              <div className="image-credit">Credit: Author Name</div>
            </div>
          </div>

          <div className="step">
            <h3>Step 2: Insert the Tension Wrench</h3>
            <p>
              Insert the tension wrench into the bottom of the lock. Apply gentle pressure to simulate the turning
              force needed to open the lock. Here's an example of the top and bottom sections of the lock:
            </p>
            <div className="image-container">
              <img src="/assets/images/topbottom.png" alt="Top and Bottom Sections of the Lock" />
              <div className="image-credit">Credit: Author Name</div>
            </div>
          </div>

          <div className="step">
            <h3>Step 3: Use the Pick to Set the Pins</h3>
            <p>There are several picking techniques that can help you set the pins inside a lock:</p>

            <div className="substep">
              <h4>Single Pin Picking (SPP)</h4>
              <p>
                This technique involves picking each pin individually. Carefully insert the pick and lift each pin until
                it reaches the shear line.
              </p>
              <div className="image-container">
                <img src="https://via.placeholder.com/600x300" alt="Single Pin Picking Technique" />
                <div className="image-credit">Credit: Placeholder Image</div>
              </div>
            </div>

            <div className="substep">
              <h4>Raking</h4>
              <p>
                Raking involves moving the pick back and forth across the pins. This motion can sometimes set multiple
                pins at once.
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YCSGMukrUjg?start=6"
                title="Raking Technique"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <p>
                Video Credit:{" "}
                <a href="https://www.youtube.com/@CoverInstrumentsOfficial" target="_blank" rel="noreferrer">
                  @CoverInstrumentsOfficial
                </a>
              </p>
            </div>

            <div className="substep">
              <h4>Zipping</h4>
              <p>
                Zipping is performed by inserting the pick to the back of the lock, applying slight tension, and
                quickly pulling the pick out.
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/QQLIo5f5R30?start=27"
                title="Zipping Technique"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <p>
                Video Credit:{" "}
                <a href="https://www.youtube.com/@BosnianBill" target="_blank" rel="noreferrer">
                  @BosnianBill
                </a>
              </p>
            </div>
          </div>

          <div className="step">
            <h3>Step 4: Turn the Tension Wrench to Unlock</h3>
            <p>Once all pins are set, turn the tension wrench to unlock the lock.</p>
          </div>
        </section>

        <section className="author-section">
          <h2>About the Author</h2>
          <img src="https://via.placeholder.com/100" alt="Author's Photo" />
          <p>
            <strong>Angel Ocadiz</strong> is an amateur lockpicker who has around 3 years of practice.
          </p>
        </section>

        <section className="credits">
          <h2>Credits</h2>
          <p>
            Additional information and details were sourced from{" "}
            <a
              href="https://nick.blog/wp-content/uploads/2018/04/lockpicking-detail-overkill.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Lockpicking Detail Overkill
            </a>
            .
          </p>
        </section>
      </div>

      <footer>
        <div className="footer-section">
          <div className="footer-elements">
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <h5>
                <a href="mailto:support@skillmaster.com">support@skillmaster.com</a>
              </h5>
              <h5>
                <a href="tel:123-456-7890">123-456-7890</a>
              </h5>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <h5>
                <a href="/homepage">Home</a>
              </h5>
              <h5>
                <a href="/about-us">About Us</a>
              </h5>
              <h5>
                <a href="#">Privacy Policy</a>
              </h5>
            </div>
            <div className="footer-social">
              <h3>Social Media</h3>
              <a href="#" className="fa fa-twitter"></a>
              <a href="#" className="fa fa-instagram"></a>
              <a href="#" className="fa fa-pinterest"></a>
              <a href="#" className="fa fa-linkedin"></a>
            </div>
          </div>
          <div className="footer-subscribe">
            <h5>Subscribe to our Newsletter:</h5>
            <input type="text" placeholder="Email" />
            <button type="submit">Subscribe</button>
          </div>
          <div className="footer-copyright">
            <h5>Copyright © 2024 Skill Share. All rights reserved.</h5>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LockpickingClass;
