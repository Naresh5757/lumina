# Lumina - Personal AI Assistant Project

## 1. What is this Project?
**Lumina** is a modern, intelligent personal assistant built with web technologies. It works like ChatGPT but is customized to be a personal mentor and guide. It features a beautiful, "glassmorphism" design (translucent, glass-like UI) and connects directly to Google's powerful AI models to answer questions and write code.

## 2. Technologies Used
We built this using the most modern and popular tools in 2025:

*   **Frontend Library**: **React.js** (The engine behind the user interface).
*   **Build Tool**: **Vite** (Makes the app extremely fast to start and run).
*   **Styling**: **Tailwind CSS** (For professional, consistent styling) + **Custom CSS** (For the glowing effects and glass look).
*   **AI Power**: **Google Gemini API** (The brain that processes your messages).
*   **Icons**: **React Icons** (For the sidebar and buttons).
*   **Markdown**: **react-markdown** (To display bold text, lists, and code blocks nicely).

## 3. How it Works (Simple Logic)
1.  **Input**: You type a message in the chat box.
2.  **State**: The app saves your message in a "List of Messages" (using React State).
3.  **Sending**: The app sends your message history to Google's servers via the API Key.
4.  **Thinking**: Google's Gemini model reads the history and generates a response based on the "Mentor" persona we configured.
5.  **Response**: The app receives the text and displays it on the screen, animating it for a smooth feel.

## 4. Implementation Details (How we built it)

### Step 1: Logic (The Brain)
We created a **`ChatContext`**. Think of this as a global storage box for the application.
*   It holds the `messages` array.
*   It has a `sendMessage` function that handles talking to the API.
*   It filters out the "Welcome" message so the API doesn't get confused.

### Step 2: Connection (The API)
We built a simple service file (`gemini.js`) that connects to Google.
*   We gave it specific instructions: *"You are Lumina, a helpful mentor..."*
*   This ensures the AI always acts professional and helpful.

### Step 3: Design (The Look)
We used a **Glassmorphism** style:
*   Dark background with glowing purple/indigo orbs.
*   Semi-transparent white panels (`backdrop-filter: blur`).
*   **Tailwind CSS** handled the spacing, layout, and responsiveness (mobile vs desktop).

### Step 4: Components (The Building Blocks)
*   **`Sidebar`**: The navigation menu on the left.
*   **`ChatInput`**: The box where you type (it auto-expands as you type!).
*   **`ChatMessage`**: The component that displays each bubble. It detects if it's "You" or "Lumina" and styles it differently.
