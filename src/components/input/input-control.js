// @flow
import Input from './input';
import {asFormControl} from '../form-control';
// in the case we want to export both a FormControlHOC and a FormControl component
// we'll need to export additional InputControl `export default asFormControl(Input);`
// along with the Input component `export default Input;`
export default asFormControl(Input);
