import { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import domtoimage from 'dom-to-image';
import styles from './index.less';
import pages from './cgge';
import 'file-saver';

const cgge = [
  {
    zl: '', // 重量
    cgg: '', // 称骨歌
    bzmy: '', // 八字命运
  },
];

// 获取称骨歌
// https://www.buyiju.com/cgsm/cgge.php
const trs: any[] = [];
trs.forEach((tr) => {
  // 重量
  const tds = tr.querySelectorAll('td');
  if (tds.length === 1) {
    const index = cgge.length;
    if (cgge[index]) {
      console.log('error', tr);
    } else {
      cgge.push({
        zl: tr.textContent.trim(),
        cgg: '',
        bzmy: '',
      });
    }
  } else if (tds.length === 2) {
    const label = tds[0].textContent.trim();
    const text = tds[1].textContent.trim();

    const lastIndex = cgge.length - 1;
    if (label === '称骨歌') {
      cgge[lastIndex].cgg = text;
    } else if (label === '八字命运') {
      cgge[lastIndex].bzmy = text;
    } else {
      console.log('内容解析错误: ', tds);
    }
  }
});

export default () => {
  const [image, setImage] = useState('');
  useEffect(() => {}, []);

  //   const setup = () => {
  //     const myFont = new FontFace('myFont', 'url(/font.ttf)');

  //     myFont
  //       .load()
  //       .then((font) => {
  //         document.fonts.add(font);
  //       })
  //       .then(() => {
  //         const cvs = document.querySelector('canvas');

  //         console.log(cvs);
  //         const ctx = cvs.getContext('2d');

  //         ctx.font = '30px myFont';
  //         ctx.fillText('测试', 50, 50);
  //       });
  //   };

  const generateImage = () => {
    var node = document.getElementById('book');

    domtoimage
      .toPng(node)
      .then(function (dataUrl: string) {
        setImage(dataUrl);
      })
      .catch(function (error: any) {
        console.error('oops, something went wrong!', error);
      });
  };

  const handleDownload = async () => {
    for (let i = 0; i < pages.length; i++) {
      const id = `page${i}`;
      if (!document.getElementById(id)) continue;

      try {
        const blob = await domtoimage.toBlob(document.getElementById(id) as HTMLElement);
        window.saveAs(blob, `${i}.png`);
      } catch (error) {
        continue;
      }
    }
  };

  return (
    <div className={styles.main}>
      <Space direction="vertical">
        <Button onClick={handleDownload} type="primary">
          下载全部({pages.length}张图片)
        </Button>
        <span style={{ color: 'red' }}>不是打包下载，建议下载前手动设置下载路径： chrome://settings/downloads</span>

        <Space direction="horizontal" wrap>
          {pages.map((page) => (
            <div className={styles.displayImage}>{page.cgg.replace(/[,.，。；;]/g, ' ')}</div>
          ))}
        </Space>

        {/* 不展示，用于下载大图 */}
        <div className={styles.forDownload}>
          <Space direction="horizontal" wrap>
            {pages.map((page, index) => (
              <div id={`page${index}`} className={styles.wrapImage}>
                {page.cgg.replace(/[,.，。；;]/g, ' ')}
              </div>
            ))}
          </Space>
        </div>
      </Space>
    </div>
  );
};
