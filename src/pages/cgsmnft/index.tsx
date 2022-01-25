import { useEffect, useState } from 'react';
import { Button, Space, message } from 'antd';
import domtoimage from 'dom-to-image';
import styles from './index.less';
import cgge_list from './assets/cgge';
import gs_years from './assets/gz-years';
import { IMAGE_BASEURL } from './vars';
import 'file-saver';

// const cgge = [
//   {
//     zl: '', // 重量
//     cgg: '', // 称骨歌
//     bzmy: '', // 八字命运
//   },
// ];

// 获取称骨歌
// https://www.buyiju.com/cgsm/cgge.php
// const trs: any[] = [];
// trs.forEach((tr) => {
//   // 重量
//   const tds = tr.querySelectorAll('td');
//   if (tds.length === 1) {
//     const index = cgge.length;
//     if (cgge[index]) {
//       console.log('error', tr);
//     } else {
//       cgge.push({
//         zl: tr.textContent.trim(),
//         cgg: '',
//         bzmy: '',
//       });
//     }
//   } else if (tds.length === 2) {
//     const label = tds[0].textContent.trim();
//     const text = tds[1].textContent.trim();

//     const lastIndex = cgge.length - 1;
//     if (label === '称骨歌') {
//       cgge[lastIndex].cgg = text;
//     } else if (label === '八字命运') {
//       cgge[lastIndex].bzmy = text;
//     } else {
//       console.log('内容解析错误: ', tds);
//     }
//   }
// });

const NFTList = ({ hasId }: { hasId?: boolean }) => (
  <Space direction="horizontal" wrap>
    {cgge_list.map(([xb, gz, cgg], index) => (
      <div id={hasId ? `nft-${index}` : undefined} key={`${xb}-${gz}`} className={styles.displayImage}>
        <div className={styles.wrapCgg}>
          {cgg
            .replace(/[,.]/g, ' ')
            .split(' ')
            .map((line, index) => (
              <span key={index}>{line}</span>
            ))}
        </div>

        <span className={styles.gz}>骨重 {gz}</span>
      </div>
    ))}
  </Space>
);

export default () => {
  const [image, setImage] = useState('');
  useEffect(() => {}, []);

  const handleDownload = async () => {
    for (let i = 0; i < cgge_list.length; i++) {
      const id = `nft-${i}`;
      if (!document.getElementById(id)) continue;
      try {
        const blob = await domtoimage.toBlob(document.getElementById(id) as HTMLElement);
        window.saveAs(blob, `${i}.png`);
      } catch (error) {
        continue;
      }
    }
  };

  const handleDownloadOne = async () => {
    try {
      const id = 'nft-1';
      const blob = await domtoimage.toBlob(document.getElementById(id) as HTMLElement);
      window.saveAs(blob, `${id}.png`);
    } catch (error) {}
  };

  const cgg_zh_metadatas = () => {
    const metadata = [];
    for (let i = 0; i < cgge_list.length; i++) {
      const item = {
        name: cgge_list[i][1],
        description: cgge_list[i][2],
        image: `${IMAGE_BASEURL}${i}.png`,
      };

      metadata.push(item);
    }

    console.log('metadata\n', metadata);
  };

  const getGzYear = (year: number): number => {
    while (year < 1924) {
      year += 60;
    }
    while (year > 1983) {
      year -= 60;
    }

    return gs_years[year];
  };

  const test_gzYear = () => {
    console.log(getGzYear(1924) === 12);
    console.log(getGzYear(1983) === 6);
    console.log(getGzYear(1984) === 12);
    console.log(getGzYear(2043) === 6);
  };

  return (
    <div className={styles.main}>
      <Space direction="vertical">
        <Button onClick={handleDownload} type="primary">
          下载全部({cgge_list.length}张图片)
        </Button>
        <Button onClick={handleDownloadOne} type="primary">
          下载1张(测试)
        </Button>
        <Button onClick={cgg_zh_metadatas} type="primary">
          称骨歌中文
        </Button>
        <Button onClick={test_gzYear} type="primary">
          测试年份骨重
        </Button>

        <span style={{ color: 'red' }}>不是打包下载，建议下载前手动设置下载路径： chrome://settings/downloads</span>

        <NFTList></NFTList>

        {/* 不展示，用于下载大图 */}
        <div className={styles.forDownload}>
          <NFTList hasId></NFTList>
        </div>
      </Space>
    </div>
  );
};
