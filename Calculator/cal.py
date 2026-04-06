import tkinter as tk

class IOSCalculator(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("iOS Style Calculator")
        self.geometry("360x600")
        self.resizable(False, False)

        self.expression = ""
        self.reset_next = False
        self.dark_mode = True

        self.create_widgets()
        self.apply_theme()

    def create_widgets(self):
        self.display_var = tk.StringVar()
        self.display_var.set("0")

        # Display
        self.display = tk.Label(self, textvariable=self.display_var, anchor="e",
                                font=("Helvetica", 40), padx=10, pady=20)
        self.display.grid(row=0, column=0, columnspan=4, sticky="nsew")

        # Top row: AC, CE, ±, 🌙
        self.top_buttons = []
        top_row = [
            ("AC", self.clear), ("CE", self.clear_entry),
            ("±", self.toggle_sign), ("🌙", self.toggle_mode)
        ]
        col = 0
        for label, command in top_row:
            btn = tk.Button(self, text=label, command=command,
                            font=("Helvetica", 16), bd=0)
            btn.grid(row=1, column=col, sticky="nsew", padx=2, pady=2)
            self.top_buttons.append(btn)
            col += 1

        # Main calculator buttons
        self.buttons = []
        button_data = [
            ("%", self.percent), ("/", lambda: self.append_operator("/")),
            ("*", lambda: self.append_operator("*")), ("-", lambda: self.append_operator("-")),
            ("7", lambda: self.append_number("7")), ("8", lambda: self.append_number("8")),
            ("9", lambda: self.append_number("9")), ("+", lambda: self.append_operator("+")),
            ("4", lambda: self.append_number("4")), ("5", lambda: self.append_number("5")),
            ("6", lambda: self.append_number("6")), ("=", self.calculate),
            ("1", lambda: self.append_number("1")), ("2", lambda: self.append_number("2")),
            ("3", lambda: self.append_number("3")), (".", self.append_dot),
            ("0", lambda: self.append_number("0"))
        ]

        row = 2
        col = 0
        for label, command in button_data:
            colspan = 4 if label == "0" else 1
            btn = tk.Button(self, text=label, command=command,
                            font=("Helvetica", 24), bd=0)
            btn.grid(row=row, column=col, columnspan=colspan, sticky="nsew", padx=2, pady=2)
            self.buttons.append(btn)
            col += colspan
            if col > 3:
                col = 0
                row += 1

        # Grid layout configuration
        for i in range(row + 1):
            self.grid_rowconfigure(i, weight=1)
        for i in range(4):
            self.grid_columnconfigure(i, weight=1)

    def toggle_mode(self):
        self.dark_mode = not self.dark_mode
        icon = "🌙" if self.dark_mode else "☀️"
        self.top_buttons[3].config(text=icon)
        self.apply_theme()

    def apply_theme(self):
        bg = "#000" if self.dark_mode else "#f4f4f4"
        fg = "#fff" if self.dark_mode else "#000"
        op_color = "orange"
        fn_color = "#a5a5a5"
        num_color = "#333" if self.dark_mode else "#ddd"
        num_fg = "#fff" if self.dark_mode else "#000"

        self.configure(bg=bg)
        self.display.configure(bg=bg, fg=fg)

        # Top row
        for i, btn in enumerate(self.top_buttons):
            if i == 3:  # Toggle button
                btn.configure(bg=fn_color, fg="black")
            else:
                btn.configure(bg=fn_color, fg="black")

        for btn in self.buttons:
            label = btn["text"]
            if label in ("/", "*", "-", "+", "=", "%"):
                btn.config(bg=op_color, fg="white")
            else:
                btn.config(bg=num_color, fg=num_fg)

    def update_display(self):
        self.display_var.set(self.expression if self.expression else "0")

    def append_number(self, num):
        if self.reset_next or self.expression == "Error":
            self.expression = ""
            self.reset_next = False
        self.expression += num
        self.update_display()

    def append_dot(self):
        if self.reset_next or self.expression == "Error":
            self.expression = "0"
            self.reset_next = False
        if not self.expression or self.expression[-1] in "+-*/":
            self.expression += "0."
        elif "." not in self.get_last_number():
            self.expression += "."
        self.update_display()

    def get_last_number(self):
        import re
        parts = re.split(r'[+\-*/]', self.expression)
        return parts[-1] if parts else ""

    def clear(self):
        self.expression = ""
        self.update_display()

    def clear_entry(self):
        if self.expression and self.expression != "Error":
            self.expression = self.expression[:-1]
        self.update_display()

    def toggle_sign(self):
        try:
            if self.expression and self.expression != "Error":
                if self.expression.startswith("-"):
                    self.expression = self.expression[1:]
                else:
                    self.expression = "-" + self.expression
            self.update_display()
        except:
            self.expression = "Error"
            self.update_display()

    def percent(self):
        try:
            if self.expression:
                result = eval(self.expression) / 100
                if isinstance(result, float):
                    result = round(result, 3)
                self.expression = str(result)
                self.reset_next = True
                self.update_display()
        except:
            self.expression = "Error"
            self.update_display()


    def append_operator(self, op):
        if not self.expression or self.expression[-1] in "+-*/":
            return
        self.expression += op
        self.reset_next = False
        self.update_display()

    def calculate(self):
        try:
            result = eval(self.expression)
            if isinstance(result, float):
                result = round(result, 3)
            self.expression = str(result)
        except:
            self.expression = "Error"
        self.update_display()
        self.reset_next = True


if __name__ == "__main__":
    app = IOSCalculator()
    app.mainloop()
