import React from 'react';
import { DateRange } from 'react-date-range';

export class DatePicker extends React.Component {

    state = {
        selectionRange: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    }

    handleSelect = (ranges) => {
        console.log('ranges', ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        this.props.onSelectDate(ranges.selection)
        this.setState({ selectionRange: ranges.selection })
    }
    render() {
        const { selectionRange } = this.state
        return (
            <div className="date-picker-container">

                <DateRange
                    classNames="date-picker-2"
                    rangeColors={"black"}
                    color={"black"}
                    className="date-pick"
                    ranges={[selectionRange]}
                    onChange={this.handleSelect}
                    months={2}
                    direction='horizontal'
                />
            </div>
        )
    }
}