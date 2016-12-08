+++
featuredpath = ""
linktitle = ""
categories = [ ]
date = "2016-12-01T23:05:23+05:30"
featuredalt = ""
featured = ""
title = "resume"
type = "resume"
description = "Hugo Responsive Resume/CV Theme for Developers"
author = "Pavel Kanyshev"
# Theme styles

# The original template comes with 6 colour schemes. You may choose styles below.
# "styles.css", "styles-2.css", "styles-3.css", "styles-4.css", "styles-5.css", "styles-6.css"
# are available. Also the source LESS files are included so
# it’s quick and easy to change the styling and colour scheme.

styles = "styles.css"

# Sidebar sections
[params]
customCSS = "/css/resume/styles.css"

# Profile section
[profile]
        name = "Prem Mallappa"
        tagline = "Embedded Linux Kernel Developer, Virtualization Expert"
#avatar = "profile.png"

# Contact section
[contact]
enable = false

# Education section
[education]
        enable = true
        title = "Education"

[[education.list]]
        degree = "M.Tech, Software Systems"
        college = "BITS Pilani, Rajastan. India"
        dates = "2014 - Present"

[[education.list]]
        degree = "Bachelors in Computer Science"
        college = "A.I.T Chickmagalur, VTU Belgaum"
        dates = "1998 - 2002"

    # Languages section
[languages]
        enable = true
        title = "Languages"

[[languages.list]]
        language = "Kannada"
        level = "Native"

[[languages.list]]
        language = "English"
        level = "Professional"

[[languages.list]]
        language = "Hindi"
        level = "Professional"

    # Interests section
[interests]
        enable = true
        title = "Interests"

[[interests.list]]
        interest = "Cycling"

[[interests.list]]
        interest = "Web"

[[interests.list]]
        interest = "Tech"

# Main body sections

# You may use markdown in summary, details and intro fields. But don't overdose, it's resume!:)

# Summary section
[summary]
        enable = true
        icon = "fa-user"
        title = "Career Profile"
        summary = "Seasoned **Embedded, Linux Kernel Developer, Virtualization Expert, ARM, ARM64 and MIPS Expert**. Have hands on experience in designing and developing custom hypervisors."

# Experiences section
[experiences]
        enable = true
        icon = "fa-briefcase"
        title = "Experiences"

[[jobs.list]]
        position = "Co-Founder and CTO"
        dates = "2016 - Present"
        company = "Vishaarga Software Pvt Ltd"
	details = "As **CTO** (Chief Technology Officer) I handle all technical requirment and project approval. As a **TRAINER**, I undertake coportate training on ARM, ARM64, Linux Kernel and Advanced C programming. As a **DEVELOPER** I get involved in BSP, board bringup. As a **MENTOR**, I guide new-joinees, fresh college-grads and experienced professionals"

[[jobs.list]]
        position = "Principal Engineer"
        dates = "2014 - 2016"
        company = "Broadcom Communication Technologies"
        details = "**Describe your role here** lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo.\n\n Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."

[[jobs.list]]
        position = "Lead Software Engineer"
        dates = "2011 - 2013"
        company = "Cavium Software Pvt Ltd"
        details = "Developed and fixed Linux __Kexec__, __Kdump__ features for **Octeon-II and Octeon-III**. __Octeon__ is Cavium flagship product based on MIPS "

[[jobs.list]]
        position = "Sr. Design Engineer"
        dates = "2005 - 2009"
        company = "ARM Ltd"
        details = "At ARM, I handled **Linux** and **Symbian** OS ports to latest ARM Cores, at that time Cortex-A8, Also worked extensively on ARM1176JZFS, and TrustZone."

    # Projects section
[projects]
        enable = true 
        icon = "fa-archive"
        title = "Projects"
        intro = "Some of the projects I did at work, and when I am free"

        [[projects.list]]
        title = "GoSSiP"
        url = "https://github.com/pmallappa/gossip"
        tagline = "GoSSiP (Go System Simulation Project), It was an effort to learn Go Language and write a simulator for ARM64. But then the focus changed to write a RISC-V Simulator. Experimentation is to see if we can get a near-cycle-accurate simulation"

        [[projects.list]]
        title = "Personal home page and blog"
        url = "https://pmallappa.github.io"
        tagline = "Used CSS3 hacks and put-together a homepage for self."

        [[projects.list]]
        title = "QEMU SMMUv3"
        url = "https://github.com/pmallappa/qemu"
        tagline = "Little profile/card-style template for Hugo."

        [[projects.list]]
        title = "spacemacs"
        url = "https://github.com/pmallappa/spacemacs"
        tagline = "My Spacemacs configuration"

    # Skills section
    [skills]
        enable = true
        icon = "fa-rocket"
        title = "Skills & Proficiency"

        [[skills.list]]
        skill = "C, Linux, OS"
        level = "98%"
               
	[[skills.list]]
	skill = " Kernel Internals & Device Drivers" 
	level = "90%"

        [[skills.list]]
        skill = "KVM, Xen, Virtualization, Hypervisors"
        level = "80%"

        [[skills.list]]
        skill = "Go, Python"
        level = "70%"

        [[skills.list]]
        skill = "HTML5 & CSS"
        level = "55%"

        [[skills.list]]
        skill = "Python, Elisp, Shell scripting"
        level = "50%"

        [[skills.list]]
        skill = "QNX, VxWorks, FreeBSD"
        level = "50%"

    # Footer section

    # The original template is released under the Creative Commons Attribution 3.0 License.
    # Please keep the original attribution link when using for your own project.
    # If you'd like to use the template without the attribution,
    # you can check out other license options via template author's website: themes.3rdwavemedia.com
    # 
    # As for Hugo port you may rewrite the "Ported for..." line with setting your name below.

    [footer]
	copyright="Prem mallappa alsjdlfajsdlfj"

+++

