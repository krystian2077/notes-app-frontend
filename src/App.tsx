import React, { useEffect, useState } from "react";
import { Note } from "./components/Note";
import { Note as NoteModel } from "./models/note";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
export const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });

        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <>
      <Container>
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes.map((note) => (
            <Col key={note._id}>
              <Note note={note} className={styles.note} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
