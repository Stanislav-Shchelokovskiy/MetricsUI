import React from "react";
import { screen, render } from "@testing-library/react";
import Forecaster from "./Forecaster";

test('renders initial state', async () => {
    render(<Forecaster />)
    expect(screen.getByLabelText('LoadIndicator')).toBeInTheDocument()
    expect(await screen.findByLabelText('Menu', undefined, { timeout: 4000, interval: 4000 })).toBeInTheDocument()
})