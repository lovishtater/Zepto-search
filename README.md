# Chip Component README

## Deployed Version

The Chip Component is deployed and accessible at https://zepto-search.vercel.app/.

## Introduction

This README file provides an overview of the design and implementation of the Chip
Component as per the given specifications. The component is built using React, with a
focus on clean code and TypeScript. The additional bonus task of handling backspace
functionality for deleting the last chip is also addressed.

## Component Features

1. **Dynamic List Display:**

   - Clicking on the input field triggers the display of a list of items.
   - As the user types, the list dynamically updates to show only items that match the
     input.

2. **Chips Management:**

   - Clicking on an item in the list turns it into a chip at the top.
   - The input field adjusts automatically, and the selected item is removed from the
     list.

3. **Chip Removal:**

   - Each chip has an "X" icon that allows the user to remove the chip.
   - Clicking the "X" icon removes the chip and adds the corresponding item back to the
     list.

4. **Backspace Functionality:**
   - When the input field is blank, pressing backspace highlights the last chip.
   - Pressing backspace again deletes the highlighted chip.

## Technologies Used

- **NextJS:** The component is built using the NextJS library, ensuring a modular and
  component-based approach.
- **TypeScript:** The codebase is written in TypeScript to provide type safety and enhance
  code readability.

- **CSS (Tailwind CSS/SCSS):** Styling is implemented using either Tailwind CSS or SCSS,
  depending on the preference and configuration.

## Usage

1. **Installation:**

   ```bash
   npm install
   ```

2. **Run the Application:**

   ```bash
   npm start
   ```

3. **Open in Browser:**
   - Open the browser and navigate to `http://localhost:3000`.

## Conclusion

The Chip Component provides a seamless and user-friendly experience for selecting and
managing items. The clean code, TypeScript integration, and backspace functionality
enhance the overall quality of the solution.
