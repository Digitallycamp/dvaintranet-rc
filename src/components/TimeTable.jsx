import { AlertCircle } from 'lucide-react';
import React from 'react';

function TimeTable() {
	return (
		<div
			className='flex items-center gap-3  bg-white text-slate-950 p-4 rounded-lg border-2 border-cyan-700 
'
		>
			<div>
				<AlertCircle color='cyan' />
			</div>
			<div>
				<h3 className='text-lg font-bold'>Time Table</h3>
				<p className='text-sm'>
					Here is your time table{' '}
					<a
						className='text-cyan-700  underline'
						href='https://docs.google.com/spreadsheets/d/1gplYLvMmDcVDgm2sEAMnpjSJzXUHW2wq_Dg4FIGzY2Y/edit?usp=sharing'
					>
						view here
					</a>
				</p>
			</div>
		</div>
	);
}

export default TimeTable;
