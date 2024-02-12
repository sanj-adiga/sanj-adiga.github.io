import React from "react"

export default function Experience() {
    const openPDF = () => {
        window.open('src/docs/Resume-SanjanaAdiga.pdf', '_blank');
      };
    
    return (
        <div id="experience">
            <h2>experience</h2>
            <p>Languages/Frameworks I have worked with:
            <br/>Java | Python | JavaScript | HTML | CSS |  | React | Next.js | Node.js | SQL | Django | MatLab | Pygame | </p>
            <p>Tools I have experience with:
            <br/>Figma | Amazon Web Services (AWS) | Oracle Cloud | Microsoft Azure | Quartus | MicroCap | Arduino | MongoDB | </p>
            <button id="resume-btn" onClick={openPDF}>Download my resume</button>
        </div>
    )
}
