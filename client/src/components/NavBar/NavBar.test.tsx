import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("should set clickedIcon stateCorrectly when an icon is clicked", () => {
    render(<NavBar />);
    const homeIcon = screen.getByTestId("home-icon");
    const messagesIcon = screen.getByTestId("messages-icon");
    const notificationsIcon = screen.getByTestId("notifications-icon");

    fireEvent.click(homeIcon);
    expect(homeIcon.className).toContain("divClicked");
    expect(messagesIcon.className).not.toContain("divClicked");
    expect(notificationsIcon.className).not.toContain("divClicked");

    fireEvent.click(messagesIcon);
    expect(messagesIcon.className).toContain("divClicked");
    expect(homeIcon.className).not.toContain("divClicked");
    expect(notificationsIcon.className).not.toContain("divClicked");

    fireEvent.click(notificationsIcon);
    expect(notificationsIcon.className).toContain("divClicked");
    expect(homeIcon.className).not.toContain("divClicked");
    expect(messagesIcon.className).not.toContain("divClicked");
  });
  it("should render sign in button with correct text", () => {
    render(<NavBar />);
    const signInButton = screen.getByTestId("Sign-in");
    expect(signInButton).toBeInTheDocument();
  });
});
