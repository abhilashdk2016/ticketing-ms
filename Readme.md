## _Microservices App Using Node JS, Express, React, NATS Server, MongoDB, Docker and Kubernetes_

## To Execute the Project, follow below steps
Edit your hosts file and add the below entry
```sh
127.0.0.1 ticketing.dev
```
Create few secret`s using below command in your Kubernetes Cluster: (Docker and Kubernetes Installation is assumed):

```sh
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
kubectl create secret generic stripe-key --from-literal=STRIPE_KEY=<YOUR_STRIPE_SECRET>
```

Change JWT_KEY as per your requirement.

Install ingress controller for your Kubernetes Cluster

For Docker Desktop
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
````

For minikube
```sh
minikube addons enable ingress
````````

For other Kubernetes Cluster please refer [Kubectl Ingress](https://kubernetes.github.io/ingress-nginx/deploy/) and execute `kubectl apply` command that is appropriate for your Kubernetes Cluster.

Install [Skaffold](https://skaffold.dev/docs/install/) for your Operating System

In the root directory of the project run
```sh
skaffold dev
```

Access the Application using ```https://ticketing.dev```
If Chrome shows some error just type ```thisisunsafe```
