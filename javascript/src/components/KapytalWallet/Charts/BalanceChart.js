import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, LabelList } from 'recharts';
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';


const data = [
  { name: 'DAI', value: 400 },
  { name: 'Compound', value: 300 },
  { name: 'Crypto', value: 300 },
];


class Example extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <>
        <PieChart width={250} height={250} onMouseEnter={this.onPieEnter}>
          <Pie data={data} innerRadius={70} outerRadius={100}
            isAnimationActive={false} dataKey="value">
            {
              this.props.elements.map((e, i) =>
                <Cell key={`cell-${i}`} fill={e.color} />
              )
            }
            <LabelList dataKey="name" position="insideStart" />
          </Pie>
        </PieChart>
        <div className={clsx(classes.cardView, classes.chartCard)}>

        </div>
      </>
    );
  }
}
export default withStyles(styles)(Example)
