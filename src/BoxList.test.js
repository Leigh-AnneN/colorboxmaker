import React from "react";
import { render } from "@testing-library/react";
import BoxList from "./BoxList";
import { fireEvent } from '@testing-library/react';

function addBox(boxList, height = "2", width = "2", backgroundColor = "peachpuff") {
    const heightInput = boxList.getByLabelText("Height");
    const widthInput = boxList.getByLabelText("Width");
    const colorInput = boxList.getByLabelText("Background Color");
    const button = boxList.getByText("Add a new box");

    fireEvent.change(heightInput, { target: { value: height } });
    fireEvent.change(widthInput, { target: { value: width } });
    fireEvent.change(colorInput, { target: { value: backgroundColor } });
    fireEvent.click(button);
}
//smoke test
it ("renders without crashing", function () {
    render (<BoxList/>);
});

//snapshot test
it("matches snapshot", function(){
 const {asFragment} = render(<BoxList/>);
    expect(asFragment()).toMatchSnapshot();
    });

it("can add a new box", function() {
    const boxList = render(<BoxList />);
    //no box yet
    expect(boxList.queryByText("Remove The Box!")).not.toBeInTheDocument();
    addBox(boxList);
    //expect to see a box
    expect(boxList.getByText("Remove The Box!")).toBeInTheDocument();

    const removeButton = boxList.getByText("Remove The Box!");  
    expect(removeButton).toBeInTheDocument();
    expect(removeButton.previousSibling).toHaveStyle(`
        width: 2em;
        height: 2em;
        background-color: peachpuff;
        `);

    expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
});
    
it("can remove a box", function() {
    const boxList = render(<BoxList />);
    addBox(boxList);
    const removeButton = boxList.getByText("Remove The Box!");
    fireEvent.click(removeButton);
    expect(removeButton).not.toBeInTheDocument();
});
