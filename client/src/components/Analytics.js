import React from 'react'
import { Card, Col, Row ,Flex, Progress} from 'antd';


function Analytics({allTransaction}) {
    const Totaltransaction=allTransaction.length;
    const incomeTransaction=allTransaction.filter(transaction=>transaction.type==='income')
    const expenseTransaction=allTransaction.filter(transaction=>transaction.type==='expense')
    const incomePercent=(incomeTransaction.length/Totaltransaction)*100;
    const expensePercent=(100-incomePercent)
    const TotalTurnover=allTransaction.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    const IncomeTurnover=incomeTransaction.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    const ExpenseTurnover=expenseTransaction.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    const incomeTurnoverPercent=( IncomeTurnover/TotalTurnover)*100;
    const expenseTurnoverPercent=( ExpenseTurnover/TotalTurnover)*100;
    const categories=["salary","project","house-rent","trading","food","fee","bill","shopping","movie","medical","tax"]
  return (
    <>
    <Row gutter={12} justify="center" align="middle" className='mt-2'>
    <Col span={12} style={{ textAlign: 'center' }} >
      <Card title={`Total Transactions : ${ Totaltransaction}`}  bordered={true}  >
        <h6>Income : {incomeTransaction.length}</h6>
        <h6>Expences : {expenseTransaction.length}</h6>
       
        <div>
        <Flex gap="small" wrap className='d-flex justify-content-between'>
      <Progress 
            type="circle" 
            strokeColor="green" 
            percent={incomePercent.toFixed(0)} 
            format={percent => `${percent}% Income`}
          />  
    <Progress 
            type="circle" 
            strokeColor="red" 
            percent={expensePercent.toFixed(0)} 
            format={percent => `${percent}% Expences`}
          />
  </Flex>
        </div>
      </Card>
    </Col>
    <Col span={12} style={{ textAlign: 'center' }} >
      <Card title={`Total Turnover : ${ TotalTurnover}`}  bordered={true}>
       
        <h6>Income : {IncomeTurnover}</h6>
        <h6>Expences : {ExpenseTurnover}</h6>
        <div>
        <Flex gap="small" wrap className='d-flex justify-content-between'>
      <Progress 
            type="circle" 
            strokeColor="green" 
            percent={incomeTurnoverPercent.toFixed(0)} 
            format={percent => `${percent}% Income`}
          />  
    <Progress 
            type="circle" 
            strokeColor="red" 
            percent={expenseTurnoverPercent.toFixed(0)} 
            format={percent => `${percent}% Expences`}
          />
  </Flex>
        </div>
      </Card>
    </Col>
   
<Col span={12} >
  <Card title="Income Statistics" bordered={true} className='mt-2'>
    {categories.map(category => {
      const amount = allTransaction
        .filter(transaction => transaction.type === "income" && transaction.category === category)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
        const percent = IncomeTurnover ? ((amount / IncomeTurnover) * 100).toFixed(0) : 0;
        const validPercent = Math.min(Math.max(Number(percent), 0), 100);
      
      return (
        amount > 0 && (

          <Card type="inner" title={`Category: ${category}`} key={category} className='mt-2'>
            <Progress  strokeColor={{
                '0%': 'blue',
                '100%': 'blue',
              }} percent={validPercent} />
              
          </Card>
        )
      );
    })}
  </Card>
</Col>
<Col span={12} >
  <Card title="Expences Statistics" bordered={true} style={{ margin: 0 }} className='mt-2'>
    {categories.map(category => {
      const amount = allTransaction
        .filter(transaction => transaction.type === 'expense' && transaction.category === category)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
        const percent = ExpenseTurnover ? ((amount / ExpenseTurnover) * 100).toFixed(0) : 0;
        const validPercent = Math.min(Math.max(Number(percent), 0), 100);
      console.log(percent)
      return (
        amount > 0 && (
          <Card type="inner" title={`Category: ${category}`} key={category} className='mt-2'>
            <Progress strokeColor="blue" percent={validPercent} />
          </Card>
        )
      );
    })}
  </Card>
</Col>

      
   
  </Row>
   
    </>
  )
}

export default Analytics