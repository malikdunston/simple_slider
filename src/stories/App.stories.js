import React from 'react';
import {storiesOf} from '@storybook/react';

import { ExampleComponent } from '../';

const stories = storiesOf("App test", module);
stories.add("SliderApp", ()=>{
	return <ExampleComponent text={"somethinnnnnnn"}/>
})