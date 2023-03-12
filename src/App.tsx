import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { Note } from "./components/Note";
import { Note as NoteModel } from "./models/note";
import { AddEditNoteDialog } from "./components/AddEditNoteDialog";
import * as NotesApi from "./network/notes_api";

import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import { FaPlus } from "react-icons/fa";

export const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Container>
        <Button
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
          onClick={() => setShowAddNoteDialog(true)}
        >
          <FaPlus />
          Add new note
        </Button>
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes.map((note) => (
            <Col key={note._id}>
              <Note
                note={note}
                className={styles.note}
                onDeleteNoteClicked={deleteNote}
                onNoteClicked={setNoteToEdit}
              />
            </Col>
          ))}
        </Row>
        {showAddNoteDialog && (
          <AddEditNoteDialog
            onDismiss={() => setShowAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setShowAddNoteDialog(false);
            }}
          />
        )}
        {noteToEdit && (
          <AddEditNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updateNote) => {
              setNotes(
                notes.map((existingNote) =>
                  existingNote._id === updateNote._id
                    ? updateNote
                    : existingNote
                )
              );
              setNoteToEdit(null);
            }}
          />
        )}
      </Container>
    </>
  );
};
