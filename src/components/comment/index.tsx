/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-02-23 10:30:06
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-02-23 10:30:16
 * @FilePath: \blog\src\components\comment\index.tsx
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
 */
import React, { forwardRef, useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus, { GiscusProps } from '@giscus/react';
import { useThemeConfig, useColorMode, ThemeConfig } from '@docusaurus/theme-common';
interface CustomThemeConfig extends ThemeConfig {
  giscus: GiscusProps & { darkTheme: string };
}

export const Comment = forwardRef<HTMLDivElement>((_props, ref) => {
  const { giscus } = useThemeConfig() as CustomThemeConfig;
  const { colorMode } = useColorMode();
  const { theme = 'light', darkTheme = 'dark_dimmed' } = giscus;
  const giscusTheme = colorMode === 'dark' ? darkTheme : theme;
  const [routeDidUpdate, setRouteDidUpdate] = useState(false);

  useEffect(() => {
    function eventHandler(e) {
      setRouteDidUpdate(true);
    }

    window.emitter.on('onRouteDidUpdate', eventHandler);

    return () => {
      window.emitter.off('onRouteDidUpdate', eventHandler);
    };
  }, []);

  if (!routeDidUpdate) {
    return null;
  }

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => (
        <div ref={ref} id="comment" style={{ paddingTop: 50 }}>
          <Giscus
            id="comments"
            mapping="title"
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            lang="zh-CN"
            loading="lazy"
            {...giscus}
            theme={giscusTheme}
          />
        </div>
      )}
    </BrowserOnly>
  );
});

export default Comment;