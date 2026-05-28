import { useState } from "react";
import "./App.css";

const projects = [
  {
    id: "smart-light",
    title: "Smart Light PCB",
    image: "/smart-light.png",
    overview:
      "This project is a smart light PCB that turns on an LED when the surrounding environment becomes dark. The circuit uses an LDR sensor to detect light levels and an op-amp comparator with hysteresis to make the switching more stable.",
    shortDescription:
      "PCB using an LDR sensor and comparator with hysteresis to control an LED based on ambient light.",
    processBlocks: [
      {
        text:
          "This project was completed with my partner Lauren, with guidance from our coach Jacob Brotmass, who works at Blue Robotics. The project was part of Nvolve, and it gave us an opportunity to get introduced to PCB design through a practical light-sensor circuit."
      },
      {
        text:
          "During the first stage of the project, we moved back and forth between LTspice simulations, breadboarding, and testing. I had to make sure we understood the LDR resistance values because I noticed that different LDRs gave slightly different resistance readings depending on the lighting conditions. To make the threshold adjustable, we added a potentiometer to the voltage divider so we could control when the LED would turn on based on the LDR resistance."
      },
      {
        text:
          "We decided to build a light-sensor PCB because it was a manageable project for learning the full PCB workflow. We started with calculations and LTspice simulations to understand the voltage divider, reference voltage, comparator behavior, MOSFET switching stage, and LED output response.",
        images: [{ src: "/ltspice-smart-light.png", alt: "Smart Light LTspice schematic" }]
      },
      {
        text:
          "After the LTspice work, we validated the circuit on a breadboard and adjusted resistor and capacitor values to tune the response. We used hysteresis, also known as a Schmitt trigger behavior, to prevent the LED from flickering when the LDR resistance was close to the switching threshold. We also added a potentiometer so the threshold gap could be adjusted during testing. Once the prototype worked as expected, we moved the design into KiCad for schematic capture and PCB layout.",
        images: [{ src: "/breadboard-stage.png", alt: "Smart Light breadboard prototype" }],
        video: { src: "/smart-light-breadboard-demo.mp4", type: "video/quicktime", title: "Smart Light Breadboard Demo" }
      },
      {
        text:
          "In KiCad, we converted the tested circuit into a manufacturable PCB. We worked on component placement, routing, through-hole and surface-mount footprints, mounting holes, power input, and the final board layout. I learned how trace width depends on the amount of current flowing through a path, and I also learned the importance of adding mounting holes early in the placement process. This stage also helped me understand PCB layering and how schematic decisions translate into real physical constraints on a board.",
        images: [
          { src: "/kicad-front.png", alt: "Smart Light PCB front render" },
          { src: "/kicad-back.png", alt: "Smart Light PCB back render" }
        ]
      }
    ]
  },
  {
    id: "class-d-audio",
    title: "Class-D Audio Amplifier",
    image: "/home-audio-block-diagram.png",
    overview:
      "This project is a complete home audio system that combines an audio input stage, graphic equalizer, Class-D amplifier, low-pass output filter, and headphone output. The system processes the input signal, separates it into three frequency bands, uses the processed signal to drive PWM amplification, and then recovers the audio signal with a low-pass filter.",
    shortDescription:
      "Audio system with equalizer, PWM modulation, switching stage, low-pass filter, and headphone output.",
    processBlocks: [
      {
        text:
          "I designed a full audio signal chain that includes the audio input, graphic equalizer, Class-D amplifier, low-pass output filter, and headphone output. The project focused on processing the input signal, separating it into three frequency bands, using those signals to drive PWM for amplification, and recovering the audio at the output using a low-pass filter.",
        images: [{ src: "/home-audio-block-diagram.png", alt: "Home Audio block diagram" }]
      },
      {
        text:
          "For the equalizer, the input audio signal is split into three frequency bands using fourth-order Butterworth bandpass filters: bass from 100 Hz to 300 Hz, midrange from 300 Hz to 3 kHz, and treble from 3 kHz to 8 kHz. I also added potentiometers to control the gain of each band. The output of each potentiometer is then combined using a summing amplifier.",
        images: [{ src: "/home-audio-equalizer-response.png", alt: "Equalizer measured frequency response" }]
      },
      {
        text:
          "This measured response shows the system when all potentiometers are boosted to maximum gain. In my system, the ripple was approximately 0.99 dB, which shows that the bandpass sections combine smoothly while still allowing gain control across the audio range."
      },
      {
        text:
          "The Class-D amplifier converts the processed audio signal into a high-frequency PWM signal by comparing the audio signal with a triangular carrier waveform. This approach improves efficiency because the output transistors operate as switches instead of staying in their linear region."
      },
      {
        text:
          "To create the triangular carrier, a 100 kHz square wave from the Arduino is passed through a high-pass filter and then an integrator. The high-pass filter removes the DC component from the 0 V to 5 V Arduino output, allowing the integrator to create a waveform that ramps both upward and downward. A parallel resistor was added across the integrator capacitor to make a leaky integrator, which reduces drift and helps prevent op-amp saturation."
      },
      {
        text:
          "The PWM signal drives the switching output stage. Deadtime was introduced between the switching signals to reduce the chance of both transistors conducting at the same time, which helps prevent shoot-through current. The measured deadtime was approximately 600 ns, and the switching output produced a waveform from about +5 V to -5 V.",
        images: [
          { src: "/home-audio-deadtime.png", alt: "Measured PWM deadtime" },
          { src: "/home-audio-switching-output.png", alt: "Switching output stage waveform" }
        ]
      },
      {
        text:
          "At the output, an RLC low-pass filter removes high-frequency switching components and recovers the audio signal. The low-pass filter used an 8-turn coil, capacitors in parallel, and a headphone-equivalent load. The measured cutoff frequency was roughly 7.4 kHz, which was close to the expected design target.",
        images: [{ src: "/home-audio-lowpass-filter.png", alt: "Low-pass filter verification" }]
      },
      {
        text:
          "For the final breadboard test, I first tested the home audio headset output using the worst frequency settings. Then, using the three equalizer knobs, I adjusted the frequency gains until the output became clearer. The left knob controlled the bass range, the middle knob controlled the midrange, and the right knob controlled the treble.",
        video: { src: "/home-audio-demo.mp4", title: "Home Audio Breadboard Demo" }
      }
    ]
  },
  {
    id: "radio-project",
    title: "Radio Project",
    image: null,
    overview:
      "Coming soon.",
    shortDescription:
      "Coming soon.",
    processBlocks: [
      {
        text: "Coming soon."
      }
    ]
  }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  if (selectedProject) {
    return <ProjectPage project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="site">
      <nav className="navbar">
        <a href="#about">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#resume">Resume</a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/adrianagarbol/" target="_blank" rel="noreferrer">LinkedIn</a>
      </nav>

      <main className="container">
        <section id="about" className="about-section about-with-photo">
          <div className="about-text">
            <p className="label">Portfolio</p>
            <h1>Adriana Garcia</h1>
            <p className="subtitle">Electrical Engineering</p>
          </div>

          <img
            src="/adriana-headshot.JPG"
            alt="Adriana Garcia headshot"
            className="profile-photo"
          />

          <div className="about-copy">
            <h2>About me</h2>
            <p>
              I am an Electrical Engineering student interested in PCB design,
              embedded systems, analog electronics, and hands-on engineering projects.
            </p>
            <p>
              This portfolio shows my projects, technical skills, and resume in a clean and simple format.
            </p>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <p className="label">Projects</p>
          <h2>Featured Projects</h2>

          <div className="project-grid">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="project-card"
              >
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <span>{project.title.split(" ")[0]}</span>
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <span className="project-link">View project →</span>
              </button>
            ))}
          </div>
        </section>

        <section id="resume" className="resume-section">
          <div>
            <p className="label">Resume</p>
            <h2>View my resume</h2>
            <p>You can view or download my resume here.</p>
          </div>
          <div className="resume-actions">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="resume-button">
              Open Resume
            </a>
            <a href="/resume.pdf" download className="resume-button secondary-resume-button">
              Download Resume
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProjectPage({ project, onBack }) {
  return (
    <div className="site">
      <nav className="project-nav">
        <button onClick={onBack}>← Back to portfolio</button>
        <p>Project Page</p>
      </nav>

      <main className="wide-container">
        <section className="project-hero project-hero-split">
          <div>
            <h1>{project.title}</h1>
            <p>{project.overview}</p>
          </div>

          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} main project image`}
              className="hero-project-image"
            />
          )}
        </section>

        <section className="detail-card process-section">
          <h2>What I worked on</h2>

          {project.processBlocks.map((block, index) => (
            <div key={index} className="process-block">
              <p>{block.text}</p>

              {block.images && (
                <div className="process-image-row">
                  {block.images.map((image) => (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className="process-image"
                    />
                  ))}
                </div>
              )}

              {block.video && (
                <div className="process-video-wrapper">
                  <video className="process-video" controls>
                    <source src={block.video.src} type={block.video.type || "video/mp4"} />
                    Your browser does not support the video tag.
                  </video>
                  <p className="video-caption">{block.video.title}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
