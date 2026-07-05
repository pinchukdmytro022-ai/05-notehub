import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { NOTE_TAGS } from "../../types/note";
import type { NewNote, NoteTag } from "../../types/note";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
}

interface InitialValues extends NewNote { 
    tag: NoteTag;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newNote: InitialValues) => createNote(newNote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("You have successfully created a new note!");
            onClose();
        },
    });

    const initialValues: InitialValues = {
        title: "",
        content: "",
        tag: NOTE_TAGS[0],
    };

    const NoteFormSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, "Title must be at least 3 characters")
            .max(50, "Title is too long")
            .required("Title is required"),
        content: Yup.string().max(500, "Content is too long"),
        tag: Yup.mixed<NoteTag>()
            .required("Tag is required")
            .oneOf(
                NOTE_TAGS,
                "Tag must be one of: Todo, Work, Personal, Meeting, Shopping",
            ),
    });
    
    const handleSubmit = (values: InitialValues) => {
        mutation.mutate(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={NoteFormSchema}
        >
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage name="title" className={css.error} component="span" />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field
                        as="textarea"
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage name="content" className={css.error} component="span" />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                        {NOTE_TAGS.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name="tag" className={css.error} component="span" />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={mutation.isPending}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default NoteForm;