// pipeline {
//     agent {
//         label 'docker'
//     }
//     stages {
//         stage('Build') {
//             steps {
//                 sh "docker build -t ${GIT_COMMIT} ."
//             }
//         }
//         stage('Publish') {
//             when { branch 'master' }
//             steps {
//                 withDockerRegistry([credentialsId: 'fintlabsacr.azurecr.io', url: 'https://fintlabsacr.azurecr.io']) {
//                     sh "docker tag ${GIT_COMMIT} fintlabsacr.azurecr.io/vigo-azure-ad-frontend:latest"
//                     sh "docker push fintlabsacr.azurecr.io/vigo-azure-ad-frontend:latest"
//                 }
//             }
//         }
//         stage('Build backend') {
//             when { branch 'master' }
//             steps {
//                 build 'FINTLabs/vigo-azure-ad-service/master'
//             }
//         }
//     }
// }
