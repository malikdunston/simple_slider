import React from 'react';
import { storiesOf } from '@storybook/react';

import { Requirements } from '../Components/Requirements';

const stories = storiesOf('App Test', module);
// npm run storybook...
stories.add("App", ()=>{
	return <Requirements/>
}) 