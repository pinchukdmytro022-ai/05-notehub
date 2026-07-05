import axios from "axios";
import type { NewNote, Note } from "../types/note";

type CreateNoteResponse = Note;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

type DeleteNoteResponse = Note;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
    query: string,
    currentPage: number,
): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>("/notes", {
        params: {
            search: query,
            page: currentPage,
            perPage: 12,
        },
        headers: {
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        },
    });
    return response.data;
};

export const createNote = async (
    newNote: NewNote,
): Promise<CreateNoteResponse> => {
    const response = await axios.post<CreateNoteResponse>("/notes", newNote, {
        headers: {
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        },
    });
    return response.data;
};

export const deleteNote = async(
    noteId: string,
): Promise<DeleteNoteResponse> => {
    const response = await axios.delete<DeleteNoteResponse>(`/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
        },
    });
    return response.data;
}