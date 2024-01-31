/*
 * @Author: duxinyues yongyuan253015@gmail.com
 * @Date: 2023-02-23 10:28:57
 * @LastEditors: duxinyues yongyuan253015@gmail.com
 * @LastEditTime: 2023-02-23 10:29:07
 * @FilePath: \blog\src\clientModules\routeModules.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${yongyuan253015@gmail.com}, All Rights Reserved.
 */
import mitt from 'mitt';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const emitter = mitt();

if (ExecutionEnvironment.canUseDOM) {
  window.emitter = emitter;
}

export function onRouteDidUpdate() {
  if (ExecutionEnvironment.canUseDOM) {
    setTimeout(() => {
      window.emitter.emit('onRouteDidUpdate');
    });
  }
  // https://github.com/facebook/docusaurus/issues/8278
}