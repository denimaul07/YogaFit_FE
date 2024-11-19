import Api from '../api/Api'
import checkRole from './modules/role.js';
import { ref  } from 'vue'
import waitingicon from '@/assets/images/logo/loading.gif'
import Swal from 'sweetalert2';
import dayjs from 'dayjs'
const token = localStorage.getItem('token_yogafit')
Api.defaults.headers.common['Authorization'] = "Bearer " +token
const pesan=ref("")
const processing=ref(false)
const loading = ref(true)
const loadingButton = ref(false)
const loadingSubmit = ref(false)

const apiGetData = async (url = "", paramsData = {}) => {
    loading.value=true
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    return await Api.get(url, { params: paramsData })
    .then((response) => {
        loading.value=false
        return response.data;
    })
    .catch((error) => {  
        const response = error.response
        pesan.value='';
        const title = response.data.message;
        if (response.data.status_code === 403) {
            sweetError(title, 'Anda Tidak Memiliki Akses')
        } else if (response.status === 400) {
            const ResObj = Object.values(response.data.data)
            ResObj.forEach(value => {
                pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
            });
            sweetError(title, pesan.value)
        } else {
            pesan.value = 'Oppss Error'
            sweetError(pesan.value, response.data.message);
        }
        return false;
    });
};

const apiPostData = async (url = "", paramsData = "", notif=true) => {
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    return await Api.post(url, paramsData )
    .then((response) => {
        
        if (response.status===201) {
            if (notif==true) {
                sweetSuccess(null, response.data.message)
                return true;
            } else {
                return true;
            }
        } else {
            sweetError(null, response.data.message)
            return false;
        }
    
    })
    .catch((error) => {
        const response = error.response
        pesan.value='';
        const title = response.data.message ?? response.message;
        if (response.status === 403) {
            sweetError(title, 'Anda Tidak Memiliki Akses')
        } else if (response.status === 400) {
            const ResObj = Object.values(response.data.data)
            ResObj.forEach(value => {
                pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
            });
            sweetError(title, pesan.value)
        } else {
            pesan.value = 'Oppss Error'
            sweetError(pesan.value, response.message);
        }
        return false;
    });
};

const apiPostDataWithReturn = async (url = "", paramsData = "", notif=true) => {
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    return await Api.post(url, paramsData )
    .then((response) => {
        
        if (response.status===201) {
            if (notif==true) {
                sweetSuccess(null, response.data.message)
                return {
                    success: true,
                    data: response.data,
                };
            } else {
                return true;
            }
        } else {
            sweetError(null, response.data.message)
            return false;
        }
    
    })
    .catch((error) => {
        const response = error.response
        pesan.value='';
        const title = response.data.message ?? response.message;
        if (response.status === 403) {
            sweetError(title, 'Anda Tidak Memiliki Akses')
        } else if (response.status === 400) {
            const ResObj = Object.values(response.data.data)
            ResObj.forEach(value => {
                pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
            });
            sweetError(title, pesan.value)
        } else {
            pesan.value = 'Oppss Error'
            sweetError(pesan.value, response.message);
        }
        return false;
    });
};

const apiPutData = async (url = "", paramsData = "", notif=true) => {
    console.log('Nilai notif:', notif);
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    return await Api.put(url, paramsData )
    .then((response) => {
        console.log('Response Status:', response.status);
        console.log('Notif Value in Response:', notif); // Cek kembali nilai notif setelah response
        
        if (response.status===201) {
            if (notif==true) {
                sweetSuccess(null, response.data.message)
                return true;
            } else {
                return true;
            }
        
        } else {
            sweetError(null, response.data.message)
            return false;
        }
    
    })
    .catch((error) => {
        const response = error.response
        pesan.value='';
        const title = response.data.message ?? response.message;
        if (response.status === 403) {
            sweetError(title, 'Anda Tidak Memiliki Akses')
        } else if (response.status === 400) {
            const ResObj = Object.values(response.data.data)
            ResObj.forEach(value => {
                pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
            });
            sweetError(title, pesan.value)
        } else {
            pesan.value = 'Oppss Error'
            sweetError(pesan.value, response.message);
        }
        return false;
    });
};

const apiDeleteData = async (url = "", paramsData = {}) => {
    loading.value=true
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    return await Api.delete(url, { params: paramsData })
    .then((response) => {
        loading.value=false
        if (response.status===201) {
            sweetSuccess(null, response.data.message)
            return true;
        } else {
            sweetError(null, response.data.message)
            return false;
        }
    
    })
    .catch((error) => {
        const response = error.response
        pesan.value='';
        const title = response.data.message ?? response.message;
        if (response.status === 403) {
            sweetError(title, 'Anda Tidak Memiliki Akses')
        } else if (response.status === 400) {
            const ResObj = Object.values(response.data.data)
            ResObj.forEach(value => {
                pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
            });
            sweetError(title, pesan.value)
        } else {
            pesan.value = 'Oppss Error'
            sweetError(pesan.value, response.message);
        }
        return false;
    });
};

const apiExportExcel = async (url = "", paramsData = {}, title = 'Data') => {
    const pesan = ref('')
    Api.defaults.headers.common['Authorization'] = "Bearer " + token
    await Api.get(url, {
        params: paramsData,
        responseType: 'blob',
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', title + '.xlsx');
        document.body.appendChild(link);
        link.click();
    }).catch((error) => {
        const response = error.response
        pesan.value='';
        const title = response.data.message ?? response.message;
        if (response.status === 403) {
            sweetError(title, 'Anda Tidak Memiliki Akses')
        } else if (response.status === 400) {
            const ResObj = Object.values(response.data.data)
            ResObj.forEach(value => {
                pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
            });
            sweetError(title, pesan.value)
        } else {
            pesan.value = 'Oppss Error'
            sweetError(pesan.value, response.message);
        }
        return false;
    });
}

const apiCetakPDF = async (url = "", paramsData = {}) => {
    const pesan = ref('');
    Api.defaults.headers.common['Authorization'] = "Bearer " + token;
    
    try {
        const response = await Api.get(url, {
            params: paramsData,
            responseType: 'blob',
        });
        return response.data; // Mengembalikan data response ke pemanggil
    } catch (error) {
        const response = error.response
        pesan.value='';
        const title = response.data.message ?? response.message;
        if (response.status === 403) {
            sweetError(title, 'Anda Tidak Memiliki Akses')
        } else if (response.status === 400) {
            const ResObj = Object.values(response.data.data)
            ResObj.forEach(value => {
                pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
            });
            sweetError(title, pesan.value)
        } else {
            pesan.value = 'Oppss Error'
            sweetError(pesan.value, response.message);
        }
        return false;
    }
}

const apiDownloadFile = async (url = "", paramsData = {}) => {
    const pesan = ref('');
    Api.defaults.headers.common['Authorization'] = "Bearer " + token;
    
    try {
        const response = await Api.get(url, {
            params: paramsData,
            responseType: 'blob',
        });
        return response.data; // Mengembalikan data response ke pemanggil
    } catch (error) {
        const response = error.response
        pesan.value='';
        const title = response.data.message ?? response.message;
        if (response.status === 403) {
            sweetError(title, 'Anda Tidak Memiliki Akses')
        } else if (response.status === 400) {
            const ResObj = Object.values(response.data.data)
            ResObj.forEach(value => {
                pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
            });
            sweetError(title, pesan.value)
        } else {
            pesan.value = 'Oppss Error'
            sweetError(pesan.value, response.message);
        }
        return false;
    }
}

const sweetError = (title, pesan) => {
    Swal.fire({
        icon: "error",
        title: title ?? 'Oops... !',
        html: pesan ?? 'Harap hubungi tim IT',
        confirmButtonColor: '#d9534f',
        confirmButtonText: '<i class="fa fa-check me-2"></i> OKE',
        footer: 'Mohon periksa kembali'
    });
}

const sweetSuccess = (title, pesan) => {
    Swal.fire({
        icon: "success",
        title: title ?? 'Yeeyy, Success !',
        html: pesan ?? 'Success',
        confirmButtonColor: '#5cb85c',
        confirmButtonText: '<i class="fa fa-check me-2"></i> OKE',
    });
}

const isAdmin = checkRole(['admin', 'superAdmin']);
const isChief = checkRole(['chief']);
const isStaff = checkRole(['staff']);
const isManager= checkRole(['manager']);
const isMultimanager= checkRole(['multimanager']);
const isasManKeatas= checkRole(['manager','multimanager']);
const isChiefKeAtas= checkRole(['chief','manager','multimanager']);
const isBod = checkRole(['bod','bod1','bod2']);
const isAdminLMS = checkRole(['adminLMS']);


export { 
    apiGetData, 
    apiPostData, 
    apiPutData, 
    apiPostDataWithReturn,
    processing,
    apiDeleteData, 
    loadingButton, 
    loadingSubmit, 
    Swal,
    loading,
    pesan,
    dayjs,
    waitingicon,
    Api,
    isAdmin,
    isChief,
    isStaff,
    isManager,
    isMultimanager,
    isasManKeatas,
    isChiefKeAtas,
    isBod,
    isAdminLMS,
    apiExportExcel,
    apiCetakPDF,
    apiDownloadFile
};
