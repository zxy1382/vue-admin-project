<template>
  <div>
    <el-table border :data="menuList" row-key="id">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="权限值"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            @click="addMenu(row)"
            type="primary"
            size="small"
            :disabled="row.level === 4"
          >
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            @click="updateMenu(row)"
            type="primary"
            size="small"
            :disabled="row.level === 1"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定删除${row.name}?`"
            @confirm="delMenu(row.id)"
            width="200"
            placement="top"
          >
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level === 1">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="menuParams.id ? '修改菜单' : '添加菜单'"
    >
      <el-form>
        <el-form-item label="名称">
          <el-input
            v-model="menuParams.name"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input
            v-model="menuParams.code"
            placeholder="请输入权限值"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button>取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  fetchAddOruUpdateMenu,
  fetchAllMenu,
  fetchDeleteMenu,
} from '@/api/acl/menu';
import { MenuResponseData } from '@/api/acl/menu/type';
import { Permission } from '@/api/acl/role/type';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const menuList = ref<Permission[]>([]);
const dialogVisible = ref<boolean>(false);
const menuParams = reactive<Permission>({
  name: '',
  code: '',
  pid: 0,
  level: 0,
});

onMounted(() => {
  getAllMenu();
});

const getAllMenu = async () => {
  const res: MenuResponseData = await fetchAllMenu();
  if (res.code === 200) {
    menuList.value = res.data;
  }
};

const addMenu = (row: Permission) => {
  Object.assign(menuParams, {
    name: '',
    code: '',
    pid: 0,
    level: 0,
    id: 0,
  });
  dialogVisible.value = true;
  menuParams.level = row.level + 1;
  menuParams.pid = row.id as number;
};

const updateMenu = (row: Permission) => {
  dialogVisible.value = true;
  Object.assign(menuParams, row);
};

const save = async () => {
  const res = await fetchAddOruUpdateMenu(menuParams);
  if (res.code === 200) {
    ElMessage({
      message: '保存成功',
      type: 'success',
    });
    dialogVisible.value = false;
    getAllMenu();
  } else {
    ElMessage({
      message: res.message || '保存失败',
      type: 'error',
    });
  }
};

const delMenu = async (id: number) => {
  const res = await fetchDeleteMenu(id);
  if (res.code === 200) {
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
    getAllMenu();
  } else {
    ElMessage({
      message: res.message || '删除失败',
      type: 'error',
    });
  }
};
</script>

<style scoped></style>
