import {Container,} from "react-bootstrap"
import {useEffect, useState} from "react";

export default function Sprint2Demo() {
    const [video, setVideo] = useState<string>("");

    useEffect(() => {
        setVideo(process.env.NEXT_PUBLIC_DEMO_TWO ?? "")
    }, [])

    return (
        <Container className="vw-100 vh-100 p-3 p-md-5 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center mt-3 mb-5">Sprint 2 Demo</h2>

            <p>Greetings!<br />You are about to view a video demonstration of the tasks completed in the second Sprint of our Find My Doctor web application. Simply click Play to have a look at the first iteration of the application!</p>

            <iframe
                className="mt-5"
                width="80%" height="60%"
                src="https://www.youtube.com/embed/olNmawHNyhc"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Container>
    )
}