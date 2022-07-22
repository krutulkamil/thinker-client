import React, {useState, FunctionComponent, ChangeEvent, KeyboardEvent} from "react";

interface TagInputProps {
    tagList: string[],
    addTag: (tag: string) => void,
    removeTag: (tag: string) => void
}

const TagInput: FunctionComponent<TagInputProps> = ({tagList, addTag, removeTag}): JSX.Element => {
    const [tag, setTag] = useState<string>("");

    const changeTagInput = (event: ChangeEvent<HTMLInputElement>) => setTag(event.target.value);

    const handleAddTag = () => {
        if (!!tag) {
            addTag(tag);
            setTag("");
        }
    }

    const handleRemoveTag = (tag: string) => {
        removeTag(tag);
    }

    const handleTagInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "Enter":
            case "Tab":
            case "Comma":
                if (event.key !== "Tab") event.preventDefault();
                handleAddTag();
        }
    };

    return (
        <>
            <fieldset className="form-group">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    value={tag}
                    onChange={changeTagInput}
                    onBlur={handleAddTag}
                    onKeyDown={handleTagInputKeyDown}
                />

                <div className="tag-list">
                    {tagList.map((tag, index) => (
                        <span className="tag-default tag-pill" key={index}>
                            <i className="ion-close-round" onClick={() => handleRemoveTag(tag)}/>
                            {tag}
                        </span>
                    ))}
                </div>
            </fieldset>
        </>
    );
};

export default TagInput;