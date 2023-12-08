export interface UserData {
  first_name: string | null;
  last_name: string | null;
  surname: string | null;
  // contact
  email: string | null;
  phone: string | null;
  // address
  street: string | null;
  city: string | null;
  code: string | null;
  country: string | null;
  // billing
  account: string | null;
  creditCardNo: string | null;
  creditCardExp: string | null;
  creditCardCvv: string | null;
  documents: [] | null,
  liveness: [] | null
}
