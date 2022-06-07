import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from "./NavBar";

test("Show NU Room Title", async () => {
    render(<NavBar ></NavBar>);
    expect(await screen.getByText('NU-Room')).toBeVisible();
})
