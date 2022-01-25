import { useState } from 'react';
import { Radio, Select, Form, Button } from 'antd';
import gz_years from './assets/gz-years';
import gz_month from './assets/gz-month';
import gz_day from './assets/gz-day';
import gz_hour from './assets/gz-hour';
import { METADATA_BASEURL } from './vars';

const { Option } = Select;

const year_options: any = [];
for (let i = 1924; i <= 2030; i++) {
  year_options.push(
    <Option key={i} value={i}>
      {i}
    </Option>,
  );
}

const getGzYear = (year: number): number => {
  while (year < 1924) {
    year += 60;
  }
  while (year > 1983) {
    year -= 60;
  }

  return gz_years[year];
};

export default () => {
  const [metadataURL, setMetadataURL] = useState('');
  const onFinish = (e: any) => {
    const { gender, year, month_gz, day_gz, hour_gz } = e;
    const year_gz = getGzYear(year);

    const gz = year_gz + month_gz + day_gz + hour_gz;
    console.log('gz: ', gz);

    const index = gender === 1 ? gz - 21 : gz - 21 + 51;
    console.log(index);

    const url = `${METADATA_BASEURL}${index}.json`;
    setMetadataURL(url);
  };
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="出生年份" name="year">
          <Select>{year_options}</Select>
        </Form.Item>
        <Form.Item label="出生月份" name="month_gz">
          <Select>
            {gz_month.map((gz, index) => (
              <Option key={index} value={gz}>
                {index + 1}月
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="出生日期" name="day_gz">
          <Select>
            {gz_day.map((gz, index) => (
              <Option key={index} value={gz}>
                {index + 1}日
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="出生时辰" name="hour_gz">
          <Select options={gz_hour}></Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          测算
        </Button>
      </Form>

      {metadataURL && (
        <a href={metadataURL} target="_blank">
          {metadataURL}
        </a>
      )}
    </div>
  );
};
