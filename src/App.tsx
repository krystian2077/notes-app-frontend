import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

import { Note } from "./components/Note";
import { Note as NoteModel } from "./models/note";
import { AddEditNoteDialog } from "./components/AddEditNoteDialog";
import * as NotesApi from "./network/notes_api";

import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import { FaPlus } from "react-icons/fa";

export const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);

        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
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

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
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
  );

  return (
    <>
      <Container className={styles.notesPage}>
        <Button
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
          onClick={() => setShowAddNoteDialog(true)}
        >
          <FaPlus />
          Add new note
        </Button>

        {notesLoading && <Spinner animation="border" variant="primary" />}
        {showNotesLoadingError && (
          <p>Something went wrong. Please refresh the page.</p>
        )}
        {!notesLoading && !showNotesLoadingError && (
          <>
            {notes.length > 0 ? notesGrid : <p>You dont have any notes yet</p>}
          </>
        )}

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
