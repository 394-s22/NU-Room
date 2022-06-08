import React from "react";
import { render, screen } from '@testing-library/react';
import Form from "./Form.js";

// Xinyu Wu
test("Show Housing Peferences correctly in the form", async () => {
    render(<Form></Form>);
    expect(await screen.getByText('Housing Preferences')).toBeVisible();
})