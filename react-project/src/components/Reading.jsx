import React from "react"

export default function Reading() {
    const openPDF = () => {
        window.open('src/docs/Resume-SanjanaAdiga.pdf', '_blank');
      };
    
    return (
        <div id="reading">
            <h2>reading list for this month:</h2>
            <ul>
                <li>The Martian</li>
                <li>If Beale Street Could Talk</li>
                <li>The Brothers Karamazov</li>
                <li>Giovanni's Room</li>
                <li>The Kite Runner</li>
                

                <p></p>

                
            </ul>
            
        </div>
    )
}

// read list: change stylling
// unread list:

// reviews and takeaways from each book + rating out of 5
