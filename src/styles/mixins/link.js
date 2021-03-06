import { css } from 'emotion'
import {
	primaryColor,
	primaryActiveColor,
} from '../colors'

export default css`
	color: ${primaryColor};
	text-decoration: none;
	&:focus, &:hover, &:active{
		text-decoration: underline;
		color: ${primaryActiveColor};
	}
`