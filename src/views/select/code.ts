export const codeConfig=[
    {key:'index.vue',caption:'index.vue',content:`<script setup lang="ts">

    import { value, config1,config2,config3} from './data.ts'
    import {useMySelect} from './selectTranslator.ts'
    import {codeConfig} from './code.ts'
    import  CodeView from '@/components/CodeView/index.vue'
    
    //
    const config2Translated=useMySelect(config2)
    const config3Translated=useMySelect(config3)
    </script>
    
    <template>
      <div>
        <h3>This sample try to show how to enhance the functionalities of the base component.<br>
          The el-select can set options by el-option in template.<br>
          Here we try to config options by JSON or by funciton. In real project can also config options by a String which is a URL to remottely load options.
        </h3>
        {{ value }}
        <h3>In this sample options are configured in slot directly</h3>
        <CompWrap :config="config1"></CompWrap>	
        <el-divider></el-divider>
        <h3>In this sample options are configured by JSON array</h3>
        <CompWrap :config="config2Translated"></CompWrap>	
        <el-divider></el-divider>
        <h3>In this sample options are configured by function</h3>
        <CompWrap :config="config3Translated"></CompWrap>	
        <el-divider></el-divider>
        <CodeView :config="codeConfig"></CodeView>
      </div>
    </template>
    <style>
    
    </style>`},
    {key:'data.ts',caption:'data.ts',content:`import { ref, reactive } from "vue";

    //The value of the input which are share in this sample
    export const value = ref("003");
    
    //
    export const config1 = reactive({
      sys: {
        //
        component: "ElSelect",
        modelValue: value,
      },
      props: {
        placeholder: "Please select manager",
        clearable: true,
        filterable: true,
      },
      slots: {
        default: [
          {
            type: "wrap",
            value: {
              sys: { component: "ElOption" },
              props: { label: "Tom", value: "001" },
            },
          },
          {
            type: "wrap",
            value: {
              sys: { component: "ElOption" },
              props: { label: "Jack", value: "002" },
            },
          },
          {
            type: "wrap",
            value: {
              sys: { component: "ElOption" },
              props: { label: "Peter", value: "003" },
            },
          },
          {
            type: "wrap",
            value: {
              sys: { component: "ElOption" },
              props: { label: "Alice", value: "004" },
            },
          },
        ],
      },
      events: {},
    });
    
    //
    export const config2 = reactive({
      sys: {
        //
        component: "ElSelect",
        modelValue: value,
      },
      props: {
        placeholder: "Please select",
        clearable: true,
        filterable: true,
      },
      slots: {},
      events: {},
      extra: {
        options: {
          valueField: "code",
          labelField: "name",
          value: [
            { code: "001", name: "Tom" },
            { code: "002", name: "Jack" },
            { code: "003", name: "Peter" },
            { code: "004", name: "Alice" },
          ],
        },
      },
    });
    //
    export const config3 = reactive({
      sys: {
        //
        component: "ElSelect",
        modelValue: value,
      },
      props: {
        placeholder: "Please select",
        clearable: false,
        filterable: false,
      },
      slots: {},
      events: {},
      extra: {
        options: {
          valueField: "code",
          labelField: "name",
          value: loadOptions,
        },
      },
    });
    //Demo to load data,maybe from remote server
    function loadOptions() {
      return [
        { code: "001", name: "Tom" },
        { code: "002", name: "Jack" },
        { code: "003", name: "Peter" },
        { code: "004", name: "Alice" },
      ];
    }
    `},
  ]