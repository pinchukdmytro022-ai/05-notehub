import css from "./SearchBox.module.css";
import { useState } from "react";

interface SearchBoxProps {
  onQueryChange: (query: string) => void;
}

const SearchBox = ({ onQueryChange }: SearchBoxProps) => { 
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;

        setInputValue(nextValue);
        onQueryChange(nextValue);
    };

    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            onChange={handleChange}
            value={inputValue}
        />
    );
};

export default SearchBox;