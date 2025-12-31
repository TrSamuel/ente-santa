<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samuel TR - Flutter Developer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg: #0f172a;
            --card-bg: rgba(255, 255, 255, 0.05);
            --text: #e2e8f0;
            --accent: #03dac6;
            --primary: #02569b;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }

        #particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(10px);
            padding: 1rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            transition: 0.3s;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--accent);
        }

        .nav-links {
            list-style: none;
            display: flex;
            gap: 2rem;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--text);
            font-weight: 500;
            transition: 0.3s;
            position: relative;
        }

        .nav-links a:hover {
            color: var(--accent);
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--accent);
            transition: 0.3s;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .hamburger {
            display: none;
            font-size: 1.8rem;
            cursor: pointer;
            color: var(--accent);
        }

        .home {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://img.freepik.com/free-psd/modern-abstract-deep-blue-gradient-background_84443-3768.jpg') center/cover no-repeat;
        }

<<<<<<< HEAD
        .home-content h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
=======
<!-- <img src='/screenshots/Screenshot 2025-12-28 162405.png'> -->
>>>>>>> 92a252e8f1c2ac5ca3e2b514238bd4005b3d07ef

        .home-content span {
            color: var(--accent);
        }

        .home-content p {
            font-size: 1.5rem;
            margin: 1rem 0;
            opacity: 0.9;
        }

        .btn {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: var(--accent);
            color: var(--bg);
            font-weight: bold;
            border-radius: 50px;
            text-decoration: none;
            transition: 0.4s;
            box-shadow: 0 0 20px rgba(3, 218, 198, 0.4);
        }

        .btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(3, 218, 198, 0.6);
        }

        section {
            padding: 8rem 5%;
            opacity: 0;
            transform: translateY(50px);
            transition: 1s;
        }

        section.visible {
            opacity: 1;
            transform: translateY(0);
        }

        h2 {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 4rem;
            color: var(--accent);
            position: relative;
        }

        h2::after {
            content: '';
            width: 100px;
            height: 4px;
            background: var(--accent);
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 2px;
        }

        .about-content {
            display: flex;
            gap: 4rem;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }

        .about-content img {
            width: 350px;
            height: 350px;
            object-fit: cover;
            border-radius: 50%;
            border: 5px solid var(--accent);
            box-shadow: 0 0 30px rgba(3, 218, 198, 0.3);
            transition: 0.5s;
        }

        .about-content img:hover {
            transform: scale(1.05);
        }

        /* Skills with Circular Progress Bars */
        .skills-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
            justify-items: center;
        }

        .skill {
            position: relative;
            width: 140px;
            height: 140px;
        }

        .skill svg {
            width: 140px;
            height: 140px;
            transform: rotate(-90deg);
        }

        .skill circle {
            fill: none;
            stroke: rgba(3, 218, 198, 0.2);
            stroke-width: 12;
        }

        .skill .progress {
            stroke: var(--accent);
            stroke-width: 12;
            stroke-linecap: round;
            transition: stroke-dashoffset 2s ease-out;
        }

        .skill .text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--accent);
        }

        .skill p {
            text-align: center;
            margin-top: 10px;
            font-size: 0.9rem;
        }

        .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .project-card {
            background: var(--card-bg);
            border-radius: 20px;
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: 0.5s;
        }

        .project-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .project-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: 0.5s;
        }

        .project-card:hover img {
            transform: scale(1.1);
        }

        .project-card h3 {
            padding: 1.5rem 1rem 0.5rem;
            color: var(--accent);
        }

        .project-links {
            padding: 1rem;
            text-align: center;
        }

        .project-links a {
            margin: 0 1rem;
            color: var(--accent);
            font-weight: bold;
        }

        .contact {
            text-align: center;
            background: rgba(15, 23, 42, 0.8);
        }

        .social-links a {
            font-size: 2.5rem;
            margin: 0 1.5rem;
            color: var(--text);
            volor":vsart  gg
            transition: 0.3s;
        }

        .social-links a:hover {
            color: var(--accent);
            transform: translateY(-10px);
        }

        @media (max-width: 768px) {
            .hamburger {
                display: block;
            }

            .nav-links {
                position: absolute;
                top: 100%;
                right: 0;
                background: rgba(15, 23, 42, 0.95);
                flex-direction: column;
                width: 250px;
                display: none;
                backdrop-filter: blur(10px);
            }

            .nav-links.active {
                display: flex;
            }

            .about-content {
                flex-direction: column; 
                text-align: center;
            }

            .home-content h1 {
                font-size: 2.8rem;
            }

            .skills-container {
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 1.5rem;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
    </style>
</head>

<body>

    <canvas id="particles"></canvas>

    <nav class="navbar">
        <div class="logo">Samuel TR</div>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <!-- <li><a href="#projects">Projects</a></li> -->
            <li><a href="#contact">Contact</a></li>
        </ul>
        <div class="hamburger"><i class="fas fa-bars"></i></div>
    </nav>

    <section id="home" class="home visible">
        <div class="home-content fade-in">
            <h1>Hi, I'm <span>Samuel TR</span></h1>
            <p><span class="typed">Flutter Developer</span></p>
            <p>Crafting beautiful cross-platform mobile experiences</p>
            <a href="#projects" class="btn">Explore Projects</a>
        </div>
    </section>

    <section id="about" class="about">
        <h2>About Me</h2>
        <div class="about-content fade-in">
            <img src="assets/images/linkdinf banner.jpg" alt="Samuel TR Photo">
            <div>
                <p>I’m a dedicated Flutter developer with a passion for crafting smooth, visually appealing, and
                    high-performing mobile applications. I take pride in writing clean and maintainable code, ensuring
                    every project reflects both quality and care.</p>
                <p>Skilled in Dart, Hive, SQLite, Provider, Bloc, and Getx. I enjoy building solutions that are not only
                    functional but also meaningful to users.</p>
                <p>Driven by curiosity and inspired by innovation, I believe growth comes from consistency, learning,
                    and humility. My goal is to keep improving with each line of code and contribute to creating
                    impactful digital experiences.</p>

                <!-- Only Requested Skills -->
                <div class="skills-container">
                    <div class="skill">
                        <svg>
                            <circle cx="70" cy="70" r="60"></circle>
                            <circle class="progress" cx="70" cy="70" r="60" stroke-dasharray="377"
                                stroke-dashoffset="38"></circle>
                        </svg>
                        <div class="text">90%</div>
                        <p>Flutter</p>
                    </div>
                    <div class="skill">
                        <svg>
                            <circle cx="70" cy="70" r="60"></circle>
                            <circle class="progress" cx="70" cy="70" r="60" stroke-dasharray="377"
                                stroke-dashoffset="38"></circle>
                        </svg>
                        <div class="text">90%</div>
                        <p>Dart</p>
                    </div>
                    <div class="skill">
                        <svg>
                            <circle cx="70" cy="70" r="60"></circle>
                            <circle class="progress" cx="70" cy="70" r="60" stroke-dasharray="377"
                                stroke-dashoffset="75"></circle>
                        </svg>
                        <div class="text">80%</div>
                        <p>HTML</p>
                    </div>
                    <div class="skill">
                        <svg>
                            <circle cx="70" cy="70" r="60"></circle>
                            <circle class="progress" cx="70" cy="70" r="60" stroke-dasharray="377"
                                stroke-dashoffset="113"></circle>
                        </svg>
                        <div class="text">70%</div>
                        <p>CSS</p>
                    </div>
                    <div class="skill">
                        <svg>
                            <circle cx="70" cy="70" r="60"></circle>
                            <circle class="progress" cx="70" cy="70" r="60" stroke-dasharray="377"
                                stroke-dashoffset="113"></circle>
                        </svg>
                        <div class="text">70%</div>
                        <p>JavaScript</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- <section id="projects" class="projects">
        <h2>My Projects</h2>
        <div class="project-grid">
            <div class="project-card fade-in">
                <img src="https://miro.medium.com/1*U9DQ-tEXHxY0_fXAUBccVQ.jpeg" alt="Messenger App">
                <h3>Messenger App</h3>
                <p>Dark mode chat app with Bloc state management and Hive local storage.</p>
                <div class="project-links"><a href="#">Play Store</a> | <a href="#">GitHub</a></div>
            </div>
            <div class="project-card fade-in">
                <img src="https://flutterawesome.com/content/images/2022/01/Flutter-Wallet-App-UI-With-Dark---Light-Theme.jpg"
                    alt="Wallet App">
                <h3>Wallet App</h3>
                <p>Elegant finance tracker with dark/light theme toggle and animations.</p>
                <div class="project-links"><a href="#">Play Store</a> | <a href="#">GitHub</a></div>
            </div>
            <div class="project-card fade-in">
                <img src="https://i.ytimg.com/vi/q6MaMgrfR5s/maxresdefault.jpg" alt="Productivity Tool">
                <h3>Productivity Tool</h3>
                <p>Task manager with Provider, Firebase sync, and stunning dark UI.</p>
                <div class="project-links"><a href="#">Play Store</a> | <a href="#">GitHub</a></div>
            </div>
        </div>
    </section> -->

    <section id="contact" class="contact">
        <h2>Contact Me</h2>
        <p class="fade-in">Email: trsamual@gmail.com</p>
        <div class="social-links fade-in">
            <a href="https://github.com/TrSamuel"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/samuel-tr"><i class="fab fa-linkedin"></i></a>
            <a href="https://x.com/samueltr661"><i class="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/samualtr/"><i class="fab fa-instagram"></i></a>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <script>
        particlesJS("particles", {
            "particles": { "number": { "value": 80 }, "color": { "value": "#03dac6" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3 }, "line_linked": { "enable": true, "distance": 150, "color": "#03dac6", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 2 } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" } } },
            "retina_detect": true
        });

        // Animate progress bars on scroll
        const progressBars = document.querySelectorAll('.progress');
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const offset = bar.getAttribute('stroke-dashoffset');
                        setTimeout(() => bar.style.strokeDashoffset = offset, 100); // Trigger animation
                    });
                }
            });
        }, { threshold: 0.6 });
        skillObserver.observe(document.querySelector('.skills-container'));

        // Mobile menu, smooth scroll, fade-in (unchanged)
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.add('fa-bars');
                    hamburger.querySelector('i').classList.remove('fa-times');
                }
            });
        });

        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
                        el.style.animationDelay = `${i * 0.2}s`;
                        el.classList.add('fade-in');
                    });
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(sec => observer.observe(sec));
    </script>
</body>

</html>