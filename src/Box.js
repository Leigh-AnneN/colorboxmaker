import React from 'react';

// Box- this component should display a div with a background color, 
// width and height based on the props passed to it.

function Box({
    id,
    handleRemove,
    width = 5,
    height = 5,
    backgroundColor = 'red'
}) {
    const remove = () => handleRemove(id);
    return (
        <div>
            <div
                style={{
                    height: `${height}em`,
                    width: `${width}em`,
                    backgroundColor
                }}
            />
            <button onClick={remove}>Remove The Box!</button>
        </div>
    );
}

export default Box;

