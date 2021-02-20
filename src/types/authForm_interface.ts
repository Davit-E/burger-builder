interface KeyAsString {
  [key: string]: any;
}

interface AuthFormProperty extends KeyAsString{
    elemType: string,
    elemConfig: {
      type: string,
      placeholder: string,
    },
    value: string,
    validation: {
      required: boolean,
    },
    isValid: boolean,
    touched: boolean,
}

export interface AuthForm extends KeyAsString{
  email: AuthFormProperty;
  password: AuthFormProperty,
}