export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+$'
);

export const validPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
);

export const validPseudo = new RegExp(
    '^[A-Za-zÀ-ÖØ-öø-ÿ0-9_]{3,16}$'
);
export const validPhoneNumber = new RegExp(
    '^[0-9]{9,10}$'
);