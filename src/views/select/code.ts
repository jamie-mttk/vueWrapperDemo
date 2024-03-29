export const codeConfig=[
    {key:'index.vue',caption:'index.vue',content:`<script setup lang="ts">

    import { value, config1,config2,config3} from './data.ts'
    import {codeConfig} from './code.ts'
    import  CodeView from '@/components/CodeView/index.vue'
    
    //
    
    
    </script>
    
    <template>
      <div>
        <h3>This sample try to show how to enhance the functionalities of the base component.<br>
          The el-select can set options by el-option in template.<br>
          Here we try to config options from a  JSON or from a funciton. In real project can also config options by a String which is a URL to load options from remote.
        </h3>
        select value:{{ value }}
        <h3>In this sample options are configured in slot directly.Refer to config1 in "data.ts".</h3>
        <CompWrap :config="config1"></CompWrap>	
        <el-divider></el-divider>
        <h3>In this sample options are configured by JSON array and then translated into standard format.Refer to config2 in "data.ts".</h3>
        <CompWrap :config="config2"></CompWrap>	
        <el-divider></el-divider>
        <h3>In this sample options are configured by function and then translated into standard format.Refer to config2 in "data.ts".</h3>
        <CompWrap :config="config3"></CompWrap>	
        <el-divider></el-divider>
        <CodeView :config="codeConfig"></CodeView>
      </div>
    </template>
    <style>
    
    </style>`},
    {key:'data.ts',caption:'data.ts',content:`import { ref, reactive } from "vue";
    import {selectTransform} from './selectTransform'
    
    //The value of the input which are share in this sample
    export const value = ref("003");
    
    //
    export const config1 = {
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
    }
    
    //
    export const config2 = {
      sys: {
        //
        component: "ElSelect",
        modelValue: value,
        //Here a transform is set to parse the options
        transform:selectTransform,
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
    }
    //
    export const config3 = {
      sys: {
        //
        component: "ElSelect",
        modelValue: value,
        transform:selectTransform,
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
    }
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
    {key:'selectTransform.ts',caption:'selectTransform.ts',content:`import { ref, reactive } from "vue";


    export function selectTransform(config: any) {
      //Clone may cause the value to be evaluted?So no clone here so far
    let configNew=config
      //extra
      let extra = configNew.extra;
      delete configNew.extra;
      //
      if (extra?.options) {
        translateOptions(extra.options, configNew);
      }
      //
      return reactive(configNew);
    }
    
    //translate options from config to slot
    function translateOptions(options, configNew) {
      //
      if (!configNew.slots) {
        configNew.slots = {};
      }
      //
      let valueOptions = options.value;
      if (!valueOptions) {
        return;
      }
      if (Array.isArray(valueOptions)) {
        //build wrap array
        configNew.slots.default =parseOptionsArray(options, valueOptions)
      } else if (typeof valueOptions == "function") {
      //If the function returns a Promise, we should await here
        configNew.slots.default=  parseOptionsFunction(options,valueOptions)
      } else {
        throw "Unsupported value option type:" + typeof valueOptions;
      }
    }
    //parse options array to wrap options
    function parseOptionsArray(options, value) {
      let labelField = options.labelField || "id";
      let valueField = options.valueField || "name";
      //
      let result ={
        type: "wrap",
        value:[]}
      //
      for (let v of value) {
        result.value.push({
            sys: { component: "el-option" },
            props: {
              label: v[labelField],
              value: v[valueField],
            }
          }
       );
      }
      //
      return result;
    }
    //
    function parseOptionsFunction(options, value) {
      //Evaluate function 
      let result=value()
      //
      return parseOptionsArray(options,result)
    
    }
    `}
  ]