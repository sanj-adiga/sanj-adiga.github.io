import React from "react"
import { Card, CardGroup } from "react-bootstrap"

function ProjectCard(title) {
    <Card style={{width: '20rem'}}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                </Card.Body>

            </Card>
}

export default function Projects() {
    return (
        <div className="projects">
            <h2>projects</h2>
            <p>Some of my projects include <a href="https://github.com/sanj-adiga">personal finance sytem</a>, 
            a <a href="https://github.com/sanj-adiga">visual representation of searching and sorting algorithms</a>,
            a <a href="https://github.com/sanj-adiga">2d platformer game made with python/pygame</a> and more.</p>
            <CardGroup id='project-cards'>
            <Card style={{width: '20rem'}} className="product-rec">
                <Card.Body>
                    <Card.Title>Product Recommendation</Card.Title>
                    <Card.Subtitle>Python, Pandas</Card.Subtitle>
                    <Card.Text>A product recommendation system built with Python, employing artificial intelligence to suggest products in the user's favourite category and subcategory based on popularity.</Card.Text>
                </Card.Body>

            </Card>
            <Card style={{width: '20rem'}} className="fithub">
                <Card.Body>
                    <Card.Title>Fithub</Card.Title>
                    <Card.Subtitle>Python, SQL, Django</Card.Subtitle>
                    <Card.Text>A gym membership database that creates, stores and displays data for registered members, upcoming classes, instructors related and equipment maintenance. A project exploring relational database design and implementation.</Card.Text>
                </Card.Body>

            </Card>
            <Card style={{width: '20rem'}} className="superhero">
                <Card.Body>
                    <Card.Title>Superhero Database</Card.Title>
                    <Card.Subtitle>Node.js, MongoDB, Express, React</Card.Subtitle>
                    <Card.Text>A fullstack MERN application that allows you to search through a database of superheros, make personal lists and rate them. A beginner nerd Letterboxd-type app.</Card.Text>
                </Card.Body>

            </Card>
            <Card style={{width: '20rem'}} className="scrub">
                <Card.Body>
                    <Card.Title>Scrub's Clean Sweep</Card.Title>
                    <Card.Subtitle>Python, Pygame</Card.Subtitle>
                    <Card.Text>A 2D platformer game built entirely in python, using the pygame library. Simple animations and increased difficulty of levels and mini-games sandwiched between each level.</Card.Text>
                </Card.Body>

            </Card>
            </CardGroup>

            <CardGroup>
            <Card style={{width: '20rem'}} className="sorting">
                <Card.Body>
                    <Card.Title>Sorting Algorithms</Card.Title>
                    <Card.Subtitle>Java, JavaFX</Card.Subtitle>
                    <Card.Text>A visual representation as to how the different algorithms search through and sort a given set of data. A closer look at examining their time and space efficiency.</Card.Text>
                </Card.Body>

            </Card>

            <Card style={{width: '20rem'}} className="ifinance">
                <Card.Body>
                    <Card.Title>Personal Finance App</Card.Title>
                    <Card.Subtitle>Java, JavaFX, SQL</Card.Subtitle>
                    <Card.Text>Storing and accessing SQL data from a personal finance app with accessibility based on user type.</Card.Text>
                </Card.Body>

            </Card>
            <Card style={{width: '20rem'}} className="instacart">
                <Card.Body>
                    <Card.Title>Recipe Recommendation Extension</Card.Title>
                    <Card.Subtitle>Consulting Challenge</Card.Subtitle>
                    <Card.Text>Storing and accessing SQL data from a personal finance app with accessibility based on user type.</Card.Text>
                </Card.Body>

            </Card>
            </CardGroup>
            <CardGroup>
            <Card style={{width: '20rem'}} className="un-challenge">
                <Card.Body>
                    <Card.Title>HomeSchooled</Card.Title>
                    <Card.Subtitle>Consulting Challenge</Card.Subtitle>
                    <Card.Text>A pilot program designed to provide women and young girls in impoverished communities in India with access to technological devices and education.</Card.Text>
                </Card.Body>

            </Card>

            <Card style={{width: '20rem'}} className="moonshot">
                <Card.Body>
                    <Card.Title>Nema</Card.Title>
                    <Card.Subtitle>Hackathon Project</Card.Subtitle>
                    <Card.Text>Leveraging plastic-dissolving enzymes from nematodes to tackle the excessive ocean plastic pollution problem.</Card.Text>
                </Card.Body>

            </Card>
            <Card style={{width: '20rem'}} className="ai-hackathon">
                <Card.Body>
                    <Card.Title>Auxilium</Card.Title>
                    <Card.Subtitle>Hackathon Project</Card.Subtitle>
                    <Card.Text>Personalizes mental health tracker utilizing an EEG device recording individual brainwaves and analyzing their relative mental state.</Card.Text>
                </Card.Body>

            </Card>
            </CardGroup>



            {/* <Card style={{width: '20rem'}}>
                <Card.Body>
                    <Card.Title>Project 4</Card.Title>
                    <Card.Subtitle>Java, JavaFX</Card.Subtitle>
                </Card.Body>

            </Card> */}

        </div>
    )
}
