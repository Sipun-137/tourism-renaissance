

export interface RegisterCredentialOption {
  id: string;
  label: string;
}

export interface RegisterCredentialItem {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
  helper: string;
  options?: RegisterCredentialOption[];
}

export const LoginCredentials = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
    helper: "We'll never share your email."
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
    helper: "We'll never show this publicly.",
  },
]


export const RegisterCredential: RegisterCredentialItem[] = [
  {
    id: 'email',
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
    helper: "We'll never share your email."
  },
  {
    id: 'name',
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
    helper: "Enter your name."
  },
  {
    id:'password',
    type:"password",
    placeholder:"Enter your password",
    label:"password",
    componentType:"input",
    helper:"Enter your password"
  },
  {
    id: 'role',
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    helper: "Enter your role.",
    options: [
      {
        id: "customer",
        label: "customer",
      },
      {
        id: "manager",
        label: "manager",
      },
      {
        id: "admin",
        label: "admin",
      },
    ],
  },

]